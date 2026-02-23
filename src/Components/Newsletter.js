import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Newsletter.css";
import PDFViewer from "./PDFViewer";

const Newsletter = () => {
  const navigate = useNavigate();

  const navigateToDiscussion = () => navigate('/discussion');
  const navigateToJobPost = () => navigate('/jobpost');
  const navigateToEvent = () => navigate('/event-portal');
  const navigateToDonation = () => navigate('/donation');
  const navigateToDashboard = () => navigate('/dashboard');
  const navigateToProfile = () => navigate('/profile');
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

  const newsletters = [
    {
      title: "January 2026 Newsletter",
      file: "/newsletters/jan-2026.pdf"
    },
    {
      title: "December 2025 Newsletter",
      file: "/newsletters/dec-2025.pdf"
    },
    {
      title: "November 2025 Newsletter",
      file: "/newsletters/nov-2025.pdf"
    }
  ];

  return (
    <div className="page-wrapper">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/cklogo.png" alt="logo" />
          <span onClick={navigateToDashboard} style={{ cursor: "pointer" }}>
            AlumniSphere
          </span>
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

      <div className="job-container">
        <h2 className="title">NEWSLETTER ARCHIVE</h2>

        <div className="form-card" style={{ padding: "25px" }}>
          {newsletters.map((nl, index) => (
            <div key={index} style={{ marginBottom: "40px" }}>
              
              <h3 style={{ marginBottom: "15px" }}>{nl.title}</h3>

              {/* PDF Viewer */}
              <PDFViewer file={nl.file} />

              {/* Download Button */}
              <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                <a
                  href={nl.file}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="submit-btn"
                  style={{
                    textDecoration: "none",
                    padding: "10px 20px",
                    fontSize: "14px",
                    backgroundColor: "#231A6D"
                  }}
                >
                  Download
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        © 2026 CKCET Alumni Network | All Rights Reserved
      </div>

    </div>
  );
};

export default Newsletter;