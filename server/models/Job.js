// models/Job.js

const mongoose = require('mongoose');

// Define Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
