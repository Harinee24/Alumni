import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import campusImg from "../assets/campus.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong!"
      );
    }
  };

  return (
<div
  className="login-page"
  style={{
    backgroundImage: `url(${campusImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    height: "100%",
    width: "100%",
  }}
>
      {/* NAVBAR */}
      {/* <nav className="transparent-navbar">
        <div className="nav-left">CKCET Alumni</div>

        <ul className="nav-center">
          <li>Discussion Forum</li>
          <li>Job Portal</li>
          <li>Events</li>
          <li>Giving</li>
        </ul>

        <div className="nav-right">
          <button className="nav-login-btn">Login</button>
        </div>
      </nav> */}

            {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <span>AlumniSphere</span>
        </div>
      </nav>

      {/* CENTER CONTENT */}
      <div className="center-container" style={{ marginTop: "10px", marginBottom: "50px" }}>
        <div className="login-card">
          <h1>Welcome CKCETian</h1>
          <p className="tagline">Connect • Grow • Inspire</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{   width: "100%",
  padding: "12px 18px",
  marginTop: "6px",
  marginBottom: "15px",
  borderRadius: "30px",
  background: "rgba(255, 255, 255, 0.9)",
  fontSize: "14px",
  transition: "0.3s",
  display: "block" }}
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Student</option>
              <option>Alumni</option>
              <option>Staff</option>
            </select>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="login-btn">
              LOGIN
            </button>
            <a href="#" onClick={() => navigate("/")} className="back-link">Back to home</a>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © CKCET Alumni
      </footer>
    </div>
  );
};

export default Login;
