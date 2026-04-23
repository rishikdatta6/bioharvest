namespace BioHarvest.Api.Models
{
    public class HarvestDecision
    {
        public int Id {  get; set; }
      public int HarvestEvaluationId {  get; set; }
      public string DecisionStatus {  get; set; }
        public string Reason {  get; set; }

      public string Recommendation {  get; set; }
       public int RiskScore {  get; set; }
       public DateTime DecidedAt {  get; set; }
    }
}
