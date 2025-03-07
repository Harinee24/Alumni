import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './ProfilePage.css'; // Assuming you have a CSS file for styling

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    department: '',
    gradYear: '',
    email: '',
    preferredJobLocation: '',
    knownSkills: [],
    experienceInYears: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Fetch user profile when component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/auth/profile', { withCredentials: true }) // Ensure session info is passed
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching profile');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'knownSkills') {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value.split(',').map((skill) => skill.trim()), // Convert comma-separated skills to an array
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        user,
        { withCredentials: true }
      );
      setUser(response.data); // Update state with the returned data
      setLoading(false);
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear session or authentication token
    axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        // Redirect to the homepage after successful logout
        navigate('/');
      })
      .catch((err) => {
        setError('Error logging out');
      });
  };
  const navigateToDiscussion = () => {
    navigate('/discussion');
  };

  // Navigate to the Job Portal page
  const navigateToJobPost = () => {
    navigate('/jobpost');
  };
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  const navigateToEvent= () => {
    navigate('/event-portal');
  };
  const navigateToDonation= () => {
    navigate('/donation');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="logo"><a href='#' onClick={navigateToDashboard} style={{color:"white"}}>AlumniSphere</a></div>
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
        <h1>Update Your Profile</h1>
      </section>

      {/* Profile Form Section */}
      <div className="profile-section">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={user.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Graduation Year:</label>
            <input
              type="number"
              name="gradYear"
              value={user.gradYear}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Preferred Job Location:</label>
            <input
              type="text"
              name="preferredJobLocation"
              value={user.preferredJobLocation}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Known Skills (comma separated):</label>
            <input
              type="text"
              name="knownSkills"
              value={user.knownSkills.join(', ')} // Display as comma-separated string
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Experience in Years:</label>
            <input
              type="number"
              name="experienceInYears"
              value={user.experienceInYears}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        
        {/* Logout Button */}
        <div className="form-group">
          <button type="button" onClick={handleLogout} disabled={loading} id='logoutbutton'>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
