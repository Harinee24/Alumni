import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to the Login page
  };

  const alumni = [
    { name: 'John Doe', story: 'John launched his own tech startup after graduation.' },
    { name: 'Jane Smith', story: 'Jane became a renowned scientist in her field.' },
    { name: 'Mike Johnson', story: 'Mike is working as a CTO at a Fortune 500 company.' },
    { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.' },
    { name: 'Chris Lee', story: 'Chris is a philanthropist and a leader in the NGO sector.' }
  ];

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AlumniSphere</div>
        <div className="nav-links">
          <a href="#">Discussion Forum</a>
          <a href="#">Job Portal</a>
          <a href="#">Events</a>
          <a href="#">Giving</a>
        </div>
        <div className="login-btn">
          <button onClick={navigateToLogin}>Login</button> {/* Redirect to Login page */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to VIT Alumni Page where Alumni & Students connect</h1>
        <button className="connect-btn">Connect Now!</button>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service"><h3>Discussion Forum</h3></div>
          <div className="service"><h3>Job/Internship Portal</h3></div>
          <div className="service"><h3>Upcoming Events</h3></div>
          <div className="service"><h3>Alumni Directory</h3></div>
          <div className="service"><h3>VIT Newsletter</h3></div>
          <div className="service"><h3>Donation Panel</h3></div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements">
        <h2>Achievements of VIT</h2>
        <div className="achievement">
          <img src="path_to_image.jpg" alt="VIT Achievement" />
          <p>VIT has been ranked among the top universities in India, known for its excellence in education.</p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h2>Success Stories</h2>
        {alumni.map((alumnus, index) => (
          <div key={index} className="story">
            <img src="path_to_alumni_image.jpg" alt={alumnus.name} />
            <h3>{alumnus.name}</h3>
            <p>{alumnus.story}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
