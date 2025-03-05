const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Login route with session-based cookie
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found!' });
      }
  
      if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password!' });
      }
  
      // Store user info in session cookie
      req.session.user = {
        _id: user._id, // Store user ID in session
        name: user.name,
        email: user.email,
        role: user.role,
      };
  
      res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });  

// Logout route to clear session cookie
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid'); // Clear the cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
