// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('Student');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       }, { withCredentials: true });

//       if (response.status === 200) {
//         console.log('Login successful!');
//         navigate('/dashboard');  // Navigate to dashboard after login
//       }
//     } catch (err) {
//       setError(err.response ? err.response.data.message : 'Something went wrong!');
//     }
//   };

//   // Function to handle navigating back to HomePage
//   const handleBack = () => {
//     navigate('/');  // Navigate to HomePage
//   };

//   return (
//     <div className="login-container">
//       <h1>Welcome CKCETian</h1>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label htmlFor="email">Mail ID:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{width:'100%'}}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="role">Role:</label>
//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="Student">Student</option>
//             <option value="Alumni">Alumni</option>
//             <option value="Staff">Staff</option>
//           </select>
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button
//   type="submit"
//   style={{
//     backgroundColor: "#231A6D", // button background
//     color: "white",              // text color
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   }}
// >
//   Login
// </button>

//       </form>

//       {/* Back Button to redirect to HomePage */}
//       <button onClick={handleBack} className="back-btn">
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default Login;





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
