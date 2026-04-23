import { useState,useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid ,ResponsiveContainer} from "recharts";
import cbg from "../../assets/images/charts_bg.png"
function Charts() {
    const [chartData, setChartData] = useState([]);

    const allCities = [
        "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune",
        "Jaipur", "Lucknow", "Ahmedabad", "Bhopal", "Indore", "Patna", "Ranchi",
        "Nagpur", "Surat", "Kanpur", "Amritsar", "Chandigarh", "Goa"
    ];
    useEffect(() => {
        fetchAllCities(); // 🔥 auto load on page open
    }, []);
    const getRandomCities = () => {
        return [...allCities]
            .sort(() => 0.5 - Math.random())
            .slice(0, 9); // 🔥 9 = perfect 3x3 grid
    };

    const fetchAllCities = async () => {
        try {
            const selectedCities = getRandomCities();

            const results = await Promise.all(
                selectedCities.map(async (city) => {

                    const geoRes = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
                    );
                    const geoData = await geoRes.json();

                    if (!geoData.results || geoData.results.length === 0) return null;

                    const lat = geoData.results[0].latitude;
                    const lon = geoData.results[0].longitude;

                    const weatherRes = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m`
                    );
                    const weatherData = await weatherRes.json();

                    const aqiRes = await fetch(
                        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi`
                    );
                    const aqiData = await aqiRes.json();

                    return {
                        city,
                        data: weatherData.hourly.time.slice(0, 10).map((t, i) => ({
                            time: t.split("T")[1],
                            temp: weatherData.hourly.temperature_2m[i],
                            humidity: weatherData.hourly.relative_humidity_2m[i],
                            aqi: aqiData.hourly.us_aqi[i]
                        }))
                    };
                })
            );

            setChartData(results.filter(Boolean));

        } catch (err) {

        }
    };

    return (
        <div style={chartBg}>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h2 style={{ color:""}} >Smart City Trends 📊</h2>

            <button onClick={fetchAllCities}>
                🔄 Load Random Cities
            </button>

            <br /><br />

            {/* 🔥 GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    padding: "20px"
                }}
            >
                {chartData.map((cityObj, index) => (
                    <div
                        key={index}
                        style={{
                            background: "#f8f9fa",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h4>{cityObj.city} 📍</h4>
                        <ResponsiveContainer width="100%" height={220}>
                        <LineChart width={300} height={200} data={cityObj.data}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="time"
                                label={{ value: "Time ⏱", position: "insideBottom", offset: -5 }}/>
                            <YAxis
                                label={{ value: "Values 📊", angle: -90, position: "insideLeft" }}
                            />

                            <Tooltip />

                            <Line type="monotone" dataKey="temp" stroke="#ff7300" />
                            <Line type="monotone" dataKey="humidity" stroke="#0077ff" />
                            <Line type="monotone" dataKey="aqi" stroke="#ff0000" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

const chartBg = {
    minHeight: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${cbg})`,
    padding:"20px"
}

export default Charts;