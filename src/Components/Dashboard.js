import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Ensure you have the correct CSS file for styling

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      // Redirect to homepage after logout
      navigate('/');
    } catch (error) {
      setError('Error logging out');
    }
  };

  // Sample Success Stories
  const alumni = [
    { name: 'John Doe', story: 'John launched his own tech startup after graduation.' },
    { name: 'Jane Smith', story: 'Jane became a renowned scientist in her field.' },
    { name: 'Mike Johnson', story: 'Mike is working as a CTO at a Fortune 500 company.' },
    { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.' },
    { name: 'Chris Lee', story: 'Chris is a philanthropist and a leader in the NGO sector.' }
  ];

  // Navigate to the Discussion page
  const navigateToDiscussion = () => {
    navigate('/discussion');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AlumniSphere</div>
        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
          <a href="#">Job Portal</a>
          <a href="#">Events</a>
          <a href="#">Giving</a>
        </div>
        <div className="logout-btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Your Dashboard</h1>
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

      {/* Media Gallery Section */}
      <section className="media-gallery">
        <h2>Media Gallery</h2>
        <div className="gallery">
          <img src="path_to_image1.jpg" alt="Media 1" />
          <img src="path_to_image2.jpg" alt="Media 2" />
          <img src="path_to_image3.jpg" alt="Media 3" />
          <img src="path_to_image4.jpg" alt="Media 4" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
