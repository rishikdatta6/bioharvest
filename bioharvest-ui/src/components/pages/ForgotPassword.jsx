import { useState } from "react";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleSend = async () => {
        try {
            const res = await fetch("/api/Auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const text = await res.text();
            if (res.ok) {
                setMsg(text);
            } else {
                setMsg(text);
            }
        } catch(err) {
            setMsg("Server not reacheable ❌");
        }
    };

    return (
        <div style={wrapper}>
            <div style={card}>
                <h2>Forgot Password</h2>

                <input
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={input}
                />

                <button onClick={handleSend} style={button}>
                    Send Reset Link
                </button>

                {msg && <p>{msg}</p>}
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
export default ForgotPassword;