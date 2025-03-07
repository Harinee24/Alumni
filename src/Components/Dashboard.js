import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; 
import { Link } from 'react-router-dom';

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
  const navigateToEvent= () => {
    navigate('/event-portal');
  };

  // Navigate to the Profile page when clicking the profile logo
  const navigateToProfile = () => {
    navigate('/profile');
  };
  const navigateToDonation= () => {
    navigate('/donation');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AlumniSphere</div>
        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
          <a href="#" onClick={navigateToJobPost}>Job Portal</a> {/* Navigate to Job Portal */}
          <a href="#"onClick={navigateToEvent}>Events</a>
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

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome VITians</h1>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-container">
  <div className="service">
    <Link to="/discussion"><h3>Discussion Forum</h3></Link>
  </div>
  <div className="service">
    <Link to="/jobpost"><h3>Job / Internship Portal</h3></Link>
  </div>
  <div className="service">
    <Link to="/event-portal"><h3>Upcoming Events</h3></Link>
  </div>
  <div className="service">
    <Link to="/alumni-directory"><h3>Alumni Directory</h3></Link>
  </div>
  <div className="service">
    <Link to="/vit-newsletter"><h3>VIT Newsletter</h3></Link>
  </div>
  <div className="service">
    <Link to="/donation"><h3>Donation Panel</h3></Link>
  </div>
</div>
      </section>

      {/* Achievements Section */}
      <h2 id='achietitle'>Achievements of VIT</h2>
      <section className="achievements">
        
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
