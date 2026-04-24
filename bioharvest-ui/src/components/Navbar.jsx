import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isGuest = localStorage.getItem("guest");
    const name = localStorage.getItem("name");

    return (
        <nav style={navStyle}>
            {/* Left */}
            <Link to="/" style={{
                textDecoration: "none", color: "white", fontWeight: "bold",
                fontSize: "18px"}}>
                BioHarvest 🌱
            </Link>

            {/* Center */}
            <div style={menuStyle}>
                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                <Link to="/charts" style={linkStyle}>Charts</Link>
            </div>

            {/* Right */}
            <div style={menuStyle}>
                {(token || isGuest )? (
                    <>
                        <span style={{ fontWeight: "500" }}>
                            Hi, {name} 👋
                        </span>

                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("name");
                                localStorage.removeItem("guest"); 
                                navigate("/login");
                            }}
                            style={logoutBtn}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                            <Link to="/dashboard"
                                style={linkStyle}
                                onClick={() => {
                                    localStorage.setItem("guest", "true");
                                    localStorage.setItem("name", "Guest");
                                    // 🔥 RESET identity
                                }}
                            >
                                Guest
                            </Link>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

const navStyle = {
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex:1000,
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#1e293b",
    color: "white"
};

const menuStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "center"
};

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
};

const logoutBtn = {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
};

export default Navbar;