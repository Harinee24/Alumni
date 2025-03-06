// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  gradYear: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  preferredJobLocation: { type: String, default: '' },
  knownSkills: { type: [String], default: [] },  // Array of skills
  experienceInYears: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
