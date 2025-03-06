const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');  // Make sure to import the User model
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// POST: Create a new job posting
router.post('/', isAuthenticated, async (req, res) => {
  const { title, company, skills, experience, description, location } = req.body;

  // Check if all required fields are provided
  if (!title || !company || !skills || !experience || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new job and associate it with the logged-in user
    const newJob = new Job({
      title,
      company,
      skills,
      experience,
      description,
      location,
      user: req.session.user._id,  // Save the user's ID to associate the job with the user
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
});

// GET: Fetch all jobs and populate the user information
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('user', 'name')  // Populate the 'user' field with the user's name
      .sort({ createdAt: -1 });  // Optional: Sort jobs by creation date (newest first)

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

module.exports = router;
