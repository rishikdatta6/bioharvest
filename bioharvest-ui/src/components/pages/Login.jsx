import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // ✅ reset

        try {
           

            const res = await fetch("https://bioharvest-api-rishik-dregeghfhcdfdnfu.centralindia-01.azurewebsites.net/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const text = await res.text();          
                setError("Invalid email or password");
                return;
            }

            const data = await res.json();

            localStorage.removeItem("guest");
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);

            navigate("/dashboard"); // ✅ correct route

        } catch (err) {
            setError("Something went wrong ❌");
        }
    };

    return (
        <div style={wrapper}>
            <div style={card}>
                <h2 style={{ marginBottom: "20px" }}>Login</h2>

                <input
                    placeholder="Email"
                    value={email}  // ✅ IMPORTANT FIX
                    onChange={(e) => setEmail(e.target.value)}
                    style={input}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}  // ✅ IMPORTANT FIX
                    onChange={(e) => setPassword(e.target.value)}
                    style={input}
                />

                <button onClick={handleLogin} style={button}>
                    Login
                </button>

                <p
                    style={{ marginTop: "10px", cursor: "pointer", color: "#3b82f6" }}
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot Password?
                </p>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}

const wrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh"
};

const card = {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    background: "white",
    textAlign: "center"
};

const input = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
};

const button = {
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
};

export default Login;