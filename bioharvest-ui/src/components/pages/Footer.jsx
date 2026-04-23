
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer style={footerStyle}>
            <div>
                <p >© 2026 BioHarvest 🌱  <Link to="/privacy" style={link}>Privacy Policy</Link> </p>
            </div>
            </footer>
 
    );
}

const footerStyle = {
    background: "#1e293b",
    color: "white",
    textAlign: "center",
    padding: "15px",
};

const link = {
    color: "white",
    textDecoration: "none",
    marginLeft: "10px"
};

export default Footer;