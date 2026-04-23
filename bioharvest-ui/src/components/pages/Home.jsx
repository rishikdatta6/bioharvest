import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png"; 
import bg from "../../assets/images/BioHarvest.png";
function Home() {
    const navigate = useNavigate();
    const slides = [
        {
            img: slide1
        },
        {
            img: slide2
        },
        {
            img: slide3
        },
        {
            img: slide4
        }
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={homeBg}>
            <div style={carouselContainer}>

                {/* IMAGE */}
                <div
                    style={{
                        width: "100%",
                        height:"100%",
                        backgroundImage: `url(${slides[index].img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "all 0.5s ease",
                        transform: "scale(1.02)"
                    }}
                />
                

                {/* DOTS */}
                <div style={dotsContainer}>
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => setIndex(i)}
                            style={{
                                ...dot,
                                opacity: i === index ? 1 : 0.4,
                                background: i === index ? "#22c55e" : "#ccc",
                                transform: i === index ? "scale(1.3)" : "scale(1)"
                            }}
                        />
                    ))}
                </div>
                

            </div>
            <button onClick={() => navigate("/dashboard")} style={ctaBtn} > Go to Dashboard </button>

        </div>
    );
}

const homeBg = {
    height: "100vh",
    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection:"column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const carouselContainer = {
    width: "100%",
    maxWidth: "1050px",
    height: "72vh",
    position: "relative",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
   
};

const ctaBtn = {
    marginTop: "20px",
    padding: "12px 24px",
    background: "#d980fa",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
};
const dotsContainer = {
    position: "absolute",
    bottom: "15px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "8px"
};

const dot = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "white",
    cursor: "pointer"
};

export default Home;

        