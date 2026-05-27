using BioHarvest.Api.Data;
using BioHarvest.Api.Models;
using BioHarvest.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BioHarvest.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HarvestController : ControllerBase
    {
        private readonly BioHarvestDbContext _context;
        private readonly HarvestEvaluationService _service;


        public HarvestController(BioHarvestDbContext context)
        {
            _context = context;
            _service = new HarvestEvaluationService();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("evaluate")]
        public ActionResult EvaluateHarvest(
    [FromBody] HarvestEvaluationRequest request)
        {
            try
            {
                var decision = _service.EvaluateHarvest(
                    request.Soil,
                    request.Aqi,
                    request.Weather,
                    request.HarvestEvaluationId);

                _context.HarvestDecisions.Add(decision);
                _context.SaveChanges();

                return Ok(decision);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

    }
}
