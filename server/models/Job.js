// server/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
