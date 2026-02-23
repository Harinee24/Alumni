// // models/Job.js

// const mongoose = require('mongoose');

// // Define Job Schema
// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   skills: { type: String, required: true },
//   experience: { type: Number, required: true },
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
// });

// const Job = mongoose.model('Job', jobSchema);

// module.exports = Job;






const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    stipend: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    lastDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedByEmail: {
      type: String,
      required: true,
    },
    applyLink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);