// src/components/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  // Fetch user profile when component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/auth/profile', { withCredentials: true })  // Ensure session info is passed
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
        [name]: value.split(',').map((skill) => skill.trim()),  // Convert comma-separated skills to an array
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Update Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={user.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Graduation Year:</label>
          <input
            type="number"
            name="gradYear"
            value={user.gradYear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Preferred Job Location:</label>
          <input
            type="text"
            name="preferredJobLocation"
            value={user.preferredJobLocation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Known Skills (comma separated):</label>
          <input
            type="text"
            name="knownSkills"
            value={user.knownSkills.join(', ')} // Display as comma-separated string
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Experience in Years:</label>
          <input
            type="number"
            name="experienceInYears"
            value={user.experienceInYears}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
