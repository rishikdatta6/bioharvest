namespace BioHarvest.Api.Models
{
    public class HarvestEvaluationRequest
    {
        public SoilQuality Soil { get; set; }
        public AQI Aqi { get; set; }
        public WeatherData Weather { get; set; }
        public int HarvestEvaluationId { get; set; }
    }
}
