import { useState } from "react";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async () => {
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/Auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const text = await res.text();

            if (res.ok) {
                setSuccess("Registered successfully ✅");
            } else {
                let msg = text;

                if (msg.includes("already")) {
                    msg = "Username is already taken";
                }
                if (msg.includes("Passwords")) {
                    msg = "Password is too weak";
                }

                setError(msg);
            }

        } catch (err) {
            setError("Something went wrong ❌");
        }
    };

    return (
        <div style={wrapper}>
            <div style={card}>
                <h2 style={{ marginBottom: "20px" }}>Register</h2>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={input}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={input}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={input}
                />

                <button onClick={handleRegister} style={button}>
                    Register
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
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

export default Register;

