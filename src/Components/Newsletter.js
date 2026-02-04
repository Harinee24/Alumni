// src/Components/AlumniDirectory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Newsletter.css';  // Add your custom styles
import { useNavigate } from 'react-router-dom';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch alumni data from the backend
  const fetchAlumni = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/alumni-directory', { withCredentials: true });
      setAlumni(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch alumni details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(); // Fetch alumni data on component mount
  }, []);
  const navigate = useNavigate();
  const navigateToDiscussion = () => {
    navigate('/discussion');
  };

  // Navigate to the Job Portal page
  const navigateToJobPost = () => {
    navigate('/jobpost');
  };
  const navigateToEvent= () => {
    navigate('/event-portal');
  };
  const navigateToDashboard= () => {
    navigate('/dashboard');
  };
  const navigateToProfile= () => {
    navigate('/profile');
  };
  const navigateToDonation= () => {
    navigate('/donation');
  };

  return (
    <div className="alumni-directory-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><a href='#' onClick={navigateToDashboard} style={{color:"white"}}>AlumniSphere</a></div>
        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
          <a href="#" onClick={navigateToJobPost}>Job Portal</a> {/* Navigate to Job Portal */}
          <a href="#" onClick={navigateToEvent}>Events</a>
          <a href="#" onClick={navigateToDonation}>Giving</a>
        </div>
        <div className="profile-btn">
  {/* Profile logo */}
  <img 
    src="profile-logo.png" 
    alt="Profile" 
    className="profile-logo" 
    onClick={navigateToProfile} 
    style={{
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      borderRadius: '50%', // This makes the image circular
      objectFit: 'cover' // Ensures the image fits nicely inside the circle
    }}
  />
</div>

      </nav>

      <section className="hero-section">
        <h1>CKCET Newsletter</h1>
      </section>

      <div className="directory-content">
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading alumni data...</p>
        ) : (
          <div className="alumni-list">
              <div className="alumni-item">
                <h3>November</h3>
                <p><strong>Click to download</strong></p>
              </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AlumniDirectory;
