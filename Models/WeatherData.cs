namespace BioHarvest.Api.Models
{
    public class WeatherData
    {
        public int WeatherDataId {  get; set; }
        public double Humidity {  get; set; }
        public double Temperature {  get; set; }
        public double Precipitation { get; set;}

        public double WindPressure {  get; set; }

        public DateTime MeasuredAt { get; set; }

        public string Location { get; set; }
        public string Source { get; set; }
    }
}
