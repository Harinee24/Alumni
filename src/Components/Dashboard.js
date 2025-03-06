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
    { name: 'John Doe', story: 'John launched his own tech startup after graduation.', profileImage: 'john.png' },
    { name: 'Jane Smith', story: 'Jane became a renowned scientist in her field.', profileImage: 'jane.png' },
    { name: 'Mike John', story: 'Mike is working as a CTO at a Fortune 500 company.', profileImage: 'mike.png' },
    { name: 'Emily Davis', story: 'Emily is a successful entrepreneur who owns multiple businesses.', profileImage: 'emily.png' }
  ];

  // Navigate to the Discussion page
  const navigateToDiscussion = () => {
    navigate('/discussion');
  };

  // Navigate to the Job Portal page
  const navigateToJobPost = () => {
    navigate('/jobpost');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AlumniSphere</div>
        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
          <a href="#" onClick={navigateToJobPost}>Job Portal</a> {/* Navigate to Job Portal */}
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
          <img src="vitachiev.png" alt="VIT Achievement" width="30px" height="220px" />
          <p>VIT has been ranked among the top universities in India, known for its excellence in education.</p>
        </div>
        <div className="achievement">
          <img src="vitachi.png" alt="VIT Achievement 2" width="30px" height="220px" />
          <p>VIT has been recognized globally for its innovative research and academic programs.</p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h2>Success Stories</h2>
        {alumni.map((alumnus, index) => (
          <div key={index} className="story">
            <img src={process.env.PUBLIC_URL + (alumnus.profileImage || 'john.png')} alt={alumnus.name} />
            <h3>{alumnus.name}</h3>
            <p>{alumnus.story}</p>
          </div>
        ))}
      </section>

      {/* Media Gallery Section */}
      <h2><center>Media Gallery</center></h2>
      <section className="media-gallery">
        <div className="gallery">
          <img src="mg1.png" alt="Media 1" width="100px" height="100px"/>
          <img src="mg2.png" alt="Media 2" width="100px" height="100px"/><br />
          <img src="mg3.png" alt="Media 3" width="100px" height="100px"/>
          <img src="mg4.png" alt="Media 4" width="100px" height="100px"/>
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
