using Microsoft.AspNetCore.Identity;

namespace BioHarvest.Api.Models
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
