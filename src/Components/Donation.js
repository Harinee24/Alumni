import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./JobPost.css"; // reuse same styling

function Donation() {
  const navigate = useNavigate();

  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToProfile = () => navigate('/profile');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToDirectory = () => navigate('/alumni-directory');

  const [user, setUser] = useState({ profilePic: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth/profile', { withCredentials: true })
      .then((res) => {
        setUser(res.data || { profilePic: '' });
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, []);

  return (
    <div className="page-wrapper">
      
      {/* NAVBAR (Same as JobPost) */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" style={{width:"150px", height:"50px"}}/>
          <a href="#" onClick={navigateToDashboard} style={{ color: "white" }}>
            AlumniSphere
          </a>
        </div>

        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
          <a href="#" onClick={navigateToJobPost}>Job Portal</a>
          <a href="#" onClick={navigateToEvent}>Events</a>
          <a href="#" onClick={navigateToDirectory}>Alumni Directory</a>
          <a href="#" onClick={navigateToDonation}>Giving</a>
        </div>

        <div className="profile-btn">
        <img
          src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "profile-logo.png"}
          alt="Profile"
          onClick={navigateToProfile}
          style={{
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="job-container">
        <h2 className="title">GIVING PANEL</h2>

        <img
          src="/donation.png"   // you can change image
          alt="Donation"
          className="banner"
        />

        {/* Donation Content Card */}
        <div className="form-card" style={{ textAlign: "center" }}>
          <h3 className="form-title">Join your hand now !</h3>

          <div style={{ marginBottom: "20px" }}>
            <img
              src="qr-placeholder.png"
              alt="Donate QR Code"
              style={{
                width: "220px",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
              }}
            />
          </div>

          <p style={{
            fontSize: "16px",
            color: "#555",
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            "Giving is not just about making a donation, it's about making a difference."
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>
    </div>
  );
}

export default Donation;