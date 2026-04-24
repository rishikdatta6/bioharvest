import { useState } from "react";

import "../Dashboard.css";

function Dashboard() {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [authError, setAuthError] = useState("");
    const [nitrogen, setNitrogen] = useState("");
    const [potassium, setPotassium] = useState("");
    const [pH, setpH] = useState("");

    const [aqiValue, setAqiValue] = useState("");

    const [temperature, setTemperature] = useState("");
    const [humidity, setHumidity] = useState("");
    const [precipitation, setPrecipitation] = useState("");

    const [decision, setDecision] = useState(null);
    const [riskFactors, setRiskFactors] = useState([]);
    const [prediction, setPrediction] = useState("");
    const [isDataFetched, setIsDataFetched] = useState(false);
    // 🔥 FETCH ALL DATA
    const fetchData = async () => {

        const token = localStorage.getItem("token");
        const isGuest = localStorage.getItem("guest");

        if (!token && !isGuest) {
            setAuthError("Please login first");
            return;
        }
        try {
            
         
            setError("")
            setAuthError("");
            if (!city.trim()) {
                setError("Please enter a city.");
                return;
            }
            
            
                    
            // 🌍 GEO
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
            );
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                setError("City not found. Please enter a valid location.");
                return;
            }

            const lat = geoData.results[0].latitude;
            const lon = geoData.results[0].longitude;

            // 🌦 WEATHER
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation`
            );
            const weatherData = await weatherRes.json();

            setTemperature(weatherData.hourly.temperature_2m[0]);
            setHumidity(weatherData.hourly.relative_humidity_2m[0]);
            setPrecipitation(weatherData.hourly.precipitation[0]);
            setNitrogen(50);
            setPotassium(40);
            setpH(6.5);

            // 🌫 AQI
            const aqiRes = await fetch(
                `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi`
            );
            const aqiData = await aqiRes.json();

            setAqiValue(aqiData.hourly.us_aqi[0]);
            // ✅ AFTER ALL DATA IS SET
            setIsDataFetched(true);
            setError("");       // ✅ reinforce clear
            setAuthError("");

        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

   
    // 🔥 BACKEND CALL
    const evaluateHarvest = async () => {

        const token = localStorage.getItem("token");
        const isGuest = localStorage.getItem("guest");

        if (isGuest && !token) {

            // 🔥 CALCULATE SCORES

            let soilScore = 0;

            if (nitrogen >= 20 && nitrogen <= 50) soilScore += 20;
            if (potassium >= 40 && potassium <= 80) soilScore += 20;
            if (pH >= 6 && pH <= 7.5) soilScore += 10;

            let aqiScore = 0;

            if (aqiValue > 300) aqiScore = 0;
            else if (aqiValue > 200) aqiScore = 5;
            else if (aqiValue > 150) aqiScore = 10;
            else if (aqiValue > 100) aqiScore = 15;
            else if (aqiValue > 50) aqiScore = 20;
            else aqiScore = 25;

            let weatherScore = 0;

            if (temperature >= 18 && temperature <= 30) weatherScore += 10;
            if (humidity <= 80) weatherScore += 10;
            if (precipitation < 5) weatherScore += 5;

            const totalScore = soilScore + aqiScore + weatherScore;


            // ✅ FIXED: NO EARLY RETURNS — ONE FLOW ONLY

            let status = "";
            let reason = "";

            // 🚨 CRITICAL CONDITIONS
            if (aqiValue > 300) {
                status = "Delay";
                reason = "Hazardous AQI levels detected.";
            }
            else if (temperature > 40 || temperature < 10) {
                status = "Delay";
                reason = "Extreme temperature conditions are not suitable for harvesting.";
            }
            else if (precipitation > 20) {
                status = "Delay";
                reason = "Heavy rainfall detected.";
            }
            else if (humidity > 95) {
                status = "Delay";
                reason = "Excessive humidity may damage crops during harvest.";
            }
            else {
                // 🔥 NORMAL SCORING
                if (totalScore >= 80) {
                    status = "Safe";
                    reason = "Environmental conditions are favorable for harvesting.";
                } else if (totalScore >= 50) {
                    status = "Caution";
                    reason = "Some environmental factors may affect harvesting.";
                } else {
                    status = "Delay";
                    reason = "Conditions are not safe for harvesting.";
                }
            }


            // ✅ ALWAYS EXECUTE (THIS WAS MISSING BEFORE)
            
            setDecision({
                decisionStatus: status,
                reason: reason
            });

            const risks = generateRiskFactors();
            setRiskFactors(risks);

            const pred = generatePrediction(status);
            setPrediction(pred);


            return;
        }

        try {
           
            const response = await fetch(
                "http://localhost:5046/api/Harvest/evaluate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        soil: {
                            nitrogen: Number(nitrogen),
                            potassium: Number(potassium),
                            pH: Number(pH),
                            location: "Field A",
                            source: "Sensor",
                            fieldId: 1
                        },
                        aqi: {
                            aqiValue: Number(aqiValue),
                            location: "Farm",
                            source: "AQI API"
                        },
                        weather: {
                            humidity: Number(humidity),
                            temperature: Number(temperature),
                            precipitation: Number(precipitation),
                            windPressure: 10,
                            location: "Farm",
                            source: "Weather API"
                        },
                        harvestEvaluationId: 1
                    }),
                }
            );

           

            const data = await response.json();
            
            setDecision(data);
            const risks = generateRiskFactors();
            setRiskFactors(risks);

            const pred = generatePrediction(data.decisionStatus || data.DecisionStatus);
            setPrediction(pred);



        } 
        catch (error) {
            // 🔥 FIX: differentiate error types
            setAuthError("Failed to evaluate harvest");
        }
    };

    const generateRiskFactors = () => {
        const risks = [];

        // 🔥 FIXED AQI LEVELS
        if (aqiValue > 300) risks.push("Hazardous air quality ⚠️");
        else if (aqiValue > 200) risks.push("Very unhealthy air");
        else if (aqiValue > 150) risks.push("Unhealthy air");

        if (temperature > 35) risks.push("High temperature stress");
        if (temperature < 10) risks.push("Low temperature risk");
        if (humidity > 85) risks.push("High humidity may cause fungal issues");
        if (precipitation > 10) risks.push("Rainfall may damage crops");

        return risks;
    };

    const generatePrediction = (status) => {

        if (status === "Safe") {
            return "Crop yield is expected to be optimal if harvested now.";
        }

        if (status === "Caution") {
            return "Yield may be affected. Monitor conditions closely.";
        }

        return "High risk of crop damage. Delay harvesting.";
    };

    return (
        <div className="dashboard">

            <h1>🌱 BioHarvest</h1>
            <p>Smart Harvest Decision System</p>

            {/* 🔥 CITY INPUT */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => {setCity(e.target.value); 
                        setIsDataFetched(false);
                        setDecision(null);      // ✅ ADD
                        setRiskFactors([]);     // ✅ ADD
                        setPrediction("");  
                    }}
                    style={{
                        padding: "10px",
                        width: "250px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        marginRight: "10px"
                    }}

                />

                <button onClick={fetchData}>
                    Fetch Data
                </button>
            </div>

            {/* 🔥 ERROR */}
            {error && <p style={{ color: "blue" }}>{error}</p>}
            {authError && <p style={{ color: "purple" }}>{authError}</p>}

            {/* 🔥 CARDS */}
            <div className="card-container">

                {/* Soil */}
                <div className="card soil">
                    <h3>🌱 Soil</h3>
                    <input placeholder="Nitrogen" value={nitrogen} readOnly />
                    <input placeholder="Potassium" value={potassium} readOnly/>
                    <input placeholder="pH" value={pH} readOnly />

                </div>

                {/* AQI */}
                <div className="card aqi">
                    <h3>🌫 AQI</h3>
                    <input placeholder="AQI" value={aqiValue} readOnly />
                </div>

                {/* Weather */}
                <div className="card weather">
                    <h3>🌦 Weather</h3>
                    <input placeholder="Temperature" value={temperature} readOnly />
                    <input placeholder="Humidity" value={humidity} readOnly />
                    <input placeholder="Precipitation" value={precipitation} readOnly/>
                </div>

            </div>

            {/* 🔥 BUTTON */}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={evaluateHarvest}
                    disabled={!isDataFetched}
                    style={{
                        opacity: isDataFetched ? 1 : 0.5,
                        cursor: isDataFetched ? "pointer" : "not-allowed"
                    }}
                >
                    Evaluate Harvest
                </button>
            </div>
            

            {/* 🔥 RESULT */}
            {decision && (
                <div className={`status-box ${decision.decisionStatus === "Safe"
                    ? "safe-bg"
                    : decision.decisionStatus === "Caution"
                        ? "caution-bg"
                        : "delay-bg"
                    }`}>
                    <h2>{decision.decisionStatus || decision.DecisionStatus}</h2>
                    <p>{decision.reason || decision.Reason}</p>

                    
                    
                </div>
            )}
            {decision && (
                <>
                    {/* 🔥 Risk Factors */}
                    <div className="riskCard" style={{ marginTop:"20px",marginBottom: "10px", padding:"10px" }}>
                        <h3>⚠️ Risk Factors</h3>

                        {riskFactors.length > 0 ? (
                            <ul style={{ listStyleType: 'none', paddingLeft:"6px",paddingRight:"6px"} }>
                                {riskFactors.map((risk, index) => (
                                    <li key={index}>{risk}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No significant risks detected ✅</p>
                        )}
                    </div>

                    {/* 🔮 Prediction */}
                    <div className="predictionCard" style={{ marginBottom: "10px", padding:"15px" }}>
                        <h3>🔮 Prediction</h3>
                        <p>{prediction}</p>
                    </div>
                </>
            )}

        </div>
    );
}

export default Dashboard;