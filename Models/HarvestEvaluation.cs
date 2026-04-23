namespace BioHarvest.Api.Models
{
    public class HarvestEvaluation
    {
        public int Id {  get; set; }
        public int SoilQualityId {  get; set; }

        public int AQIId {  get; set; }

        public int WeatherDataId {  get; set; }

        public DateTime EvaluatedAt { get; set; }

        public int FieldId {  get; set; }
    }
}
