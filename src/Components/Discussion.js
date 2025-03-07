import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Discussion.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Discussion = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch messages on component load
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/messages', { withCredentials: true });
      setMessages(response.data);
    } catch (error) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  // Initial message fetch when component loads
  useEffect(() => {
    fetchMessages();
  }, []);

  // Send a new message and refresh the messages list
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return; // Don't send empty messages

    setLoading(true); // Show loading indicator

    try {
      // Send the new message to the server
      await axios.post(
        'http://localhost:5000/api/messages',
        { content: newMessage },
        { withCredentials: true }
      );
      setNewMessage(''); // Clear input field
      // Refresh all messages after sending the new one
      fetchMessages(); // Re-fetch all messages after sending
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  
  const navigate = useNavigate();
    
  const navigateToJobPost = () => {
    navigate('/jobpost');
  };

  // Navigate to the Profile page when clicking the profile logo
  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const navigateToEvent = () => {
    navigate('/event-portal');
  };
  const navigateToDonation= () => {
    navigate('/donation');
  };

  return (
    <div className="discussion-container">
      <nav className="navbar">
        <div className="logo"><a href='#' onClick={navigateToDashboard} style={{ color: "white" }}>AlumniSphere</a></div>
        <div className="nav-links">
          <a href="#" onClick={() => navigate('/discussion')}>Discussion Forum</a> {/* Navigate directly to the Discussion page */}
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

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to the Discussion Forum</h1>
      </section>

      {/* Discussion Messages Section */}
      <div className="messages">
        <h2>Discussion Forum</h2>
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="message-list">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <div className="message-header">
                  <span>{message.sender.name}</span>
                  <span>{new Date(message.timestamp).toLocaleString()}</span>
                </div>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className='msgcont'>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            required
          />
          <button type="submit" disabled={loading} className="sendbutton">
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AlumniSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Discussion;
