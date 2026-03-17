const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// =====================
// POST: Create New Job
// =====================
router.post('/', isAuthenticated, async (req, res) => {
  const { title, company, skills, stipend, experience, lastDate, applyLink } = req.body;

  // Validate required fields
  if (!title || !company || !skills || !stipend || !lastDate) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const newJob = new Job({
      title,
      company,
      skills,
      stipend,
      experience: experience || 0,
      lastDate,
      applyLink,
      user: req.session.user._id,
      postedByEmail: req.session.user.email,
    });

    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
});

// =====================
// GET: Fetch All Jobs
// =====================
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

module.exports = router;