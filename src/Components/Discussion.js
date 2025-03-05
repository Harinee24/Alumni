import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Discussion.css'; // Assuming you have a CSS file for styling

const Discussion = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch messages on component load
  useEffect(() => {
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

    fetchMessages();
  }, []);

  // Send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return; // Don't send empty messages

    setLoading(true); // Show loading indicator

    try {
      const response = await axios.post(
        'http://localhost:5000/api/messages',
        { content: newMessage },
        { withCredentials: true }
      );
      setMessages([response.data, ...messages]); // Add the new message at the top
      setNewMessage(''); // Clear input field
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="discussion-container">
      {/* Discussion Forum Navbar */}
      <nav className="navbar">
        <div className="logo">AlumniSphere</div>
        <div className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="#">Discussion Forum</a>
        </div>
      </nav>

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

        <form onSubmit={handleSendMessage}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            required
          />
          <button type="submit" disabled={loading}>
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
