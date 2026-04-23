namespace BioHarvest.Api.Models
{
    public class SoilQuality
    {
        public int SoilQualityId {  get; set; }
        public double Nitrogen {  get; set; }

        public double Potassium {  get; set; }

        public double Phosphorus {  get; set; }

        public double Magnesium {  get; set; }

        public double Calcium {  get; set; }

        public double pH {  get; set; }

        public double Moisture {  get; set; }

        public double OrganicMatter {  get; set; }

        public DateTime MeasuredAt {  get; set; }

        public string Location {  get; set; }
        public string Source {  get; set; }

        public int FieldId {  get; set; }
    }
}
