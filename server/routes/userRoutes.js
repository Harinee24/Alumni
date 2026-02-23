// server/routes/userRoutes.js
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

// Get user profile
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user); // Send user profile data
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching user profile' });
    });
});

// Update user profile
// router.put('/profile', async (req, res) => {
//   const { name, department, gradYear, email, preferredJobLocation, knownSkills, experienceInYears } = req.body;

//   if (!req.session.user) {
//     return res.status(401).json({ message: 'Please log in to update your profile' });
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.session.user._id,  // Using the user ID from the session
//       {
//         name,
//         department,
//         gradYear,
//         email,
//         preferredJobLocation,
//         knownSkills,
//         experienceInYears,
//       },
//       { new: true } // Return the updated user object
//     );

//     if (!updatedUser) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     res.status(200).json(updatedUser); // Send the updated user data back
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating profile' });
//   }
// });


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

  if (!req.session.user) {
    return res.status(401).json({ message: 'Please log in to update your profile' });
  }

  try {
    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Basic fields
    user.name = name;
    user.department = department;
    user.gradYear = gradYear;
    user.email = email;
    user.knownSkills = knownSkills;
    user.experienceInYears = experienceInYears;

    // 🔹 Only apply job-related fields if Alumni
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

// Get Alumni Directory
router.get('/alumni-directory', async (req, res) => {
  try {
    // Fetch all users (alumni) from MongoDB
    const alumni = await User.find({ role: 'Alumni' }); // Assuming 'role' field is 'alumni' for alumni users
    if (!alumni || alumni.length === 0) {
      return res.status(404).json({ message: 'No alumni found' });
    }
    res.status(200).json(alumni); // Send list of alumni users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch alumni directory' });
  }
});

module.exports = router;
