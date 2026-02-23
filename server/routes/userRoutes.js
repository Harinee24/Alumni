// server/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ------------------ Multer Setup ------------------

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Save as userId + original extension
    cb(null, req.session.user._id + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ------------------ Routes ------------------

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found!' });
    if (user.password !== password)
      return res.status(400).json({ message: 'Incorrect password!' });

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Get profile
router.get('/profile', (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: 'Not logged in' });

  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching user profile' });
    });
});

// Update profile
router.put('/profile', async (req, res) => {
  const {
    name,
    department,
    gradYear,
    email,
    knownSkills,
    experienceInYears,
    currentCompany,
    currentRole,
    currentJobLocation,
    pastExperience,
  } = req.body;

  if (!req.session.user)
    return res.status(401).json({ message: 'Please log in to update profile' });

  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Basic fields
    user.name = name;
    user.department = department;
    user.gradYear = gradYear;
    user.email = email;
    user.knownSkills = knownSkills || [];
    user.experienceInYears = experienceInYears || 0;

    // Alumni-specific fields
    if (user.role === 'Alumni') {
      user.currentCompany = currentCompany || '';
      user.currentRole = currentRole || '';
      user.currentJobLocation = currentJobLocation || '';
      user.pastExperience = pastExperience || [];
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// ------------------ Profile Picture Upload ------------------

router.post(
  '/upload-pic',
  upload.single('profilePic'),
  async (req, res) => {
    if (!req.session.user)
      return res.status(401).json({ message: 'Not logged in' });

    try {
      const user = await User.findById(req.session.user._id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.profilePic = req.file.filename;
      await user.save();

      res.status(200).json({ profilePic: user.profilePic });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Upload failed' });
    }
  }
);

// Alumni directory
router.get('/alumni-directory', async (req, res) => {
  try {
    const alumni = await User.find({ role: 'Alumni' });
    if (!alumni || alumni.length === 0)
      return res.status(404).json({ message: 'No alumni found' });
    res.status(200).json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch alumni directory' });
  }
});

module.exports = router;