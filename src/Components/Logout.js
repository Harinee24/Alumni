import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      // Redirect to HomePage after logout
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
