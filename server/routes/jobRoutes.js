// server/routes/jobRoutes.js
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

// POST: Create a new job posting
router.post('/', isAuthenticated, async (req, res) => {
  const { title, company, skills, experience, description, location } = req.body;

  if (!title || !company || !skills || !experience || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newJob = new Job({
      title,
      company,
      skills,
      experience,
      description,
      location,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
});

// GET: Fetch all jobs (optional, for displaying in the dashboard)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

module.exports = router;
