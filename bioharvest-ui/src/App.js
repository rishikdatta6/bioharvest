import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Charts from "./components/pages/Charts";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import Footer from "./components/pages/Footer";
import Privacy from "./components/pages/Privacy";



function App() {

  
    return (
        <BrowserRouter>
            <div style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>

                <Navbar />
                <div style={{ flex: 1 ,minHeight: "80vh" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/charts" element={<Charts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                </div>

                <Footer />

            </div>
        </BrowserRouter>
  );
}

export default App;


