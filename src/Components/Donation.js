import React from 'react';
import './Donation.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateToDiscussion = () => {
    navigate('/discussion');
  };

  // Navigate to the Job Portal page
  const navigateToJobPost = () => {
    navigate('/jobpost');
  };
  const navigateToEvent = () => {
    navigate('/event-portal');
  };
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="donation-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="#" onClick={navigateToDashboard} style={{ color: 'white' }}>
            AlumniSphere
          </a>
        </div>
        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a>
          <a href="#" onClick={navigateToJobPost}>Job Portal</a>
          <a href="#" onClick={navigateToEvent}>Events</a>
          <a href="#">Giving</a>
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
              objectFit: 'cover', // Ensures the image fits nicely inside the circle
            }}
          />
        </div>
      </nav>

        {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Giving panel</h1>
      </section>
      {/* Donation Section */}
      <section className="donation-section">
        
        <div className="qr-code-container">
          <img src="qr-placeholder.png" alt="Donate QR Code" className="qr-code" />
        </div>
        <p className="donation-text">
        "Giving is not just about making a donation, it's about making a difference."
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard; // Ensure export is consistent with the component name
