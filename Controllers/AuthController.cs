using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BioHarvest.Api.Models;
using Microsoft.AspNetCore.WebUtilities;

namespace BioHarvest.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<AppUser> userManager,IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }
      
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "User registered" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return BadRequest("User not found"); // 🔥 debug
            }

            var isValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!isValid)
            {
                return BadRequest("Password incorrect"); // 🔥 debug
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token = token,
                name = user.Name,
                email = user.Email
            });
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            try
            {
                var user=await  _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                    return BadRequest("User not found");

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                token=WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                var resetLink = $"https://bioharvest-phi.vercel.app/reset-password?token={Uri.EscapeDataString(token)}&email={model.Email}";

                await _emailService.SendEmail(
                    model.Email,
                    "Reset Password",
                    $"Click here to reset: {resetLink}"
                );


                return Ok("Reset link sent");
            }
            catch (Exception ex)
            {
                return BadRequest("ERROR: " + ex.Message);
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            try
            {
                // 1. Find user
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                    return BadRequest("User not found");

                // 2. Decode token
                var decodedToken = Encoding.UTF8.GetString(
                    WebEncoders.Base64UrlDecode(model.Token)
                );

                // 3. Reset password
                var result = await _userManager.ResetPasswordAsync(
                    user,
                    decodedToken,
                    model.NewPassword
                );

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok("Password reset successful");
            }
            catch (Exception ex)
            {
                return BadRequest("ERROR: " + ex.Message);
            }
        }

        private string GenerateJwtToken(AppUser user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("THIS_IS_A_VERY_LONG_SUPER_SECRET_KEY_123456")
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}