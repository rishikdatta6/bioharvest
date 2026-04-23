using BioHarvest.Api.Models;

namespace BioHarvest.Api.Services
{
    public class HarvestEvaluationService
    {
        public HarvestDecision EvaluateHarvest(
            SoilQuality soil,
            AQI aqi,
            WeatherData weather,
            int harvestEvaluationId)
        {
            int soilScore = CalculateSoilScore(soil);
            int aqiScore = CalculateAQIScore(aqi);
            int weatherScore = CalculateWeatherScore(weather);

            int totalScore = soilScore + aqiScore + weatherScore;

            string status;
            string reason;
            // 🚨 CRITICAL OVERRIDES (real-world conditions)

            // AQI Hazardous
            if (aqi.AQIValue > 300)
            {
                return new HarvestDecision
                {
                    HarvestEvaluationId = harvestEvaluationId,
                    DecisionStatus = "Delay",
                    Reason = "Hazardous AQI levels detected.",
                    Recommendation = "Avoid harvesting due to severe air pollution.",
                    RiskScore = 95,
                    DecidedAt = DateTime.Now
                };
            }

            // Extreme Temperature
            if (weather.Temperature > 40 || weather.Temperature < 10)
            {
                return new HarvestDecision
                {
                    HarvestEvaluationId = harvestEvaluationId,
                    DecisionStatus = "Delay",
                    Reason = "Extreme temperature conditions are not suitable for harvesting.",
                    Recommendation = "Wait for moderate temperature conditions.",
                    RiskScore = 85,
                    DecidedAt = DateTime.Now
                };
            }

            // Heavy Rain
            if (weather.Precipitation > 20)
            {
                return new HarvestDecision
                {
                    HarvestEvaluationId = harvestEvaluationId,
                    DecisionStatus = "Delay",
                    Reason = "Heavy rainfall detected.",
                    Recommendation = "Delay harvesting until rain subsides.",
                    RiskScore = 90,
                    DecidedAt = DateTime.Now
                };
            }

            // Very High Humidity
            if (weather.Humidity > 95)
            {
                return new HarvestDecision
                {
                    HarvestEvaluationId = harvestEvaluationId,
                    DecisionStatus = "Delay",
                    Reason = "Excessive humidity may damage crops during harvest.",
                    Recommendation = "Wait for humidity levels to decrease.",
                    RiskScore = 80,
                    DecidedAt = DateTime.Now
                };
            }
            if (totalScore >= 80)
            {
                status = "Safe";
                reason = "Environmental conditions are favorable for harvesting.";
            }
            else if (totalScore >= 50)
            {
                status = "Caution";
                reason = "Some environmental factors may affect harvesting.";
            }
            else
            {
                status = "Delay";
                reason = "Conditions are not safe for harvesting.";
            }

            return new HarvestDecision
            {
                HarvestEvaluationId = harvestEvaluationId,
                DecisionStatus = status,
                Reason = reason,
                Recommendation = GetRecommendation(status),
                RiskScore = 100 - totalScore,
                DecidedAt = DateTime.Now
            };
        }

        private int CalculateSoilScore(SoilQuality soil)
        {
            int score = 0;

            if (soil.Nitrogen >= 20 && soil.Nitrogen <= 50)
                score += 20;

            if (soil.Potassium >= 40 && soil.Potassium <= 80)
                score += 20;

            if (soil.pH >= 6 && soil.pH <= 7.5)
                score += 10;

            return score;
        }

        private int CalculateAQIScore(AQI aqi)
        {
            if (aqi.AQIValue > 300) return 0; // 💀 Hazardous
            if (aqi.AQIValue > 200) return 5;
            if (aqi.AQIValue > 150) return 10;
            if (aqi.AQIValue > 100) return 15;
            if (aqi.AQIValue > 50) return 20;

            return 25;
        }

        private int CalculateWeatherScore(WeatherData weather)
        {
            int score = 0;

            if (weather.Temperature >= 18 && weather.Temperature <= 30)
                score += 10;

            if (weather.Humidity <= 80)
                score += 10;

            if (weather.Precipitation < 5)
                score += 5;

            return score;
        }

        private string GetRecommendation(string status)
        {
            if (status == "Safe")
                return "Harvest can proceed normally.";

            if (status == "Caution")
                return "Monitor environmental conditions before harvesting.";

            return "Delay harvest until conditions improve.";
        }
    }
}