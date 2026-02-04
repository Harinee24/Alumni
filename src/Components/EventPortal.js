import React, { useState } from 'react';
import axios from 'axios';
import './EventPortal.css'; // Assuming you have a separate CSS for styling
import { useNavigate } from 'react-router-dom';

const EventPortal = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    eventTopic: '',
    degreeAndYear: '',
    expectedStudents: '',
    eventDateTime: '',
    additionalNotes: '',
  });

  // State for handling loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/events/create-event', formData, {
        withCredentials: true, // To handle session cookies
      });
      alert(response.data.message); // Show success message
      setFormData({
        eventTopic: '',
        degreeAndYear: '',
        expectedStudents: '',
        eventDateTime: '',
        additionalNotes: '',
      }); // Reset form data
    } catch (error) {
      setError('Error: Failed to create event.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
      
    const navigateToDiscussion = () => {
      navigate('/discussion');
    };
  
    // Navigate to the Profile page when clicking the profile logo
    const navigateToProfile = () => {
      navigate('/profile');
    };
  
    const navigateToDashboard = () => {
      navigate('/dashboard');
    };
    const navigateToJobPortal = () => {
        navigate('/jobpost');
      };
      const navigateToDonation= () => {
        navigate('/donation');
      };

  return (
    <div className="event-portal-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><a href='#' onClick={navigateToDashboard} style={{color:"white"}}>AlumniSphere</a></div>
        <div className="nav-links">
          <a href="#" onClick={navigateToDiscussion}>Discussion Forum</a> {/* Use navigate for redirection */}
          <a href="#" onClick={navigateToJobPortal}>Job Portal</a> {/* Navigate to Job Portal */}
          <a href="#" >Events</a>
          <a href="#"onClick={navigateToDonation}>Giving</a>
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
        <h1>Create an Event</h1>
      </section>

      {/* Event Form Section */}
      <div className="event-form">
        <h2><center>Event Requisition Form</center></h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="eventTopic">Event Topic</label>
            <input
              type="text"
              id="eventTopic"
              name="eventTopic"
              value={formData.eventTopic}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="degreeAndYear">Degree & Year of Students</label>
            <input
              type="text"
              id="degreeAndYear"
              name="degreeAndYear"
              value={formData.degreeAndYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expectedStudents">Expected Students</label>
            <input
              type="text"
              id="expectedStudents"
              name="expectedStudents"
              value={formData.expectedStudents}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDateTime">Event Date and Time</label>
            <input
              type="datetime-local"
              id="eventDateTime"
              name="eventDateTime"
              value={formData.eventDateTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : 'Submit Event'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default EventPortal;
