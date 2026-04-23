using BioHarvest.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BioHarvest.Api.Data
{
    public class BioHarvestDbContext : IdentityDbContext<AppUser>
    {
        public BioHarvestDbContext(DbContextOptions<BioHarvestDbContext> options) : base(options) 
        {
        }   

        public DbSet<SoilQuality> SoilQualities { get; set; }
        public DbSet<AQI>AQIs { get; set; }
        public DbSet<WeatherData> WeatherData { get; set; } 
        public DbSet<HarvestEvaluation> HarvestEvaluations { get; set; }
        public DbSet<HarvestDecision>HarvestDecisions { get; set; }

      


    }
}
