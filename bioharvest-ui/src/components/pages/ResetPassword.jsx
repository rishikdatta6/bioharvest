import { useState } from "react";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleReset = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const email = params.get("email");
        const cleanToken = token?.replace(/ /g, "+");

        const res = await fetch("/api/Auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email,token:cleanToken,newPassword:password })
        });

        if (res.ok) {
            setMsg("Password reset successful ✅");
        } else {
            setMsg("Invalid or expired token ❌");
        }
    };

    return (
        <div style={wrapper}>
            <div style={card}>
                <h2>Reset Password</h2>

                <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={input}
                />

                <button onClick={handleReset} style={button}>
                    Reset Password
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


export default ResetPassword;