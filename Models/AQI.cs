namespace BioHarvest.Api.Models
{
    public class AQI
    {
        public int AQIId {  get; set; }
        public int AQIValue {  get; set; }
            
        public double PM10 {  get; set; }
          
        public double PM2_5 {  get; set; }

        public double CO {  get; set; }

        public double SO2 {  get; set; }

        public double NO2 {  get; set; }


        public double O3 {  get; set; }

        public double NH3 {  get; set; }

        public DateTime MeasuredAt { get; set; }


        public string Location {  get; set; }

        public string Source {  get; set; }

    }
}
