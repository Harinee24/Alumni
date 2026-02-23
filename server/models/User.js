// // server/models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   department: { type: String, required: true },
//   gradYear: { type: Number, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
//   preferredJobLocation: { type: String, default: '' },
//   knownSkills: { type: [String], default: [] },  // Array of skills
//   experienceInYears: { type: Number, default: 0 },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;






// server/models/User.js
const mongoose = require('mongoose');

const pastExperienceSchema = new mongoose.Schema({
  company: { type: String },
  role: { type: String },
  years: { type: Number, default: 0 },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  gradYear: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },

  // 🔹 Alumni Job Info
  currentCompany: { type: String, default: '' },
  currentRole: { type: String, default: '' },
  currentJobLocation: { type: String, default: '' },

  // 🔹 Past Companies (Multiple Allowed)
  pastExperience: {
    type: [pastExperienceSchema],
    default: [],
  },

  knownSkills: { type: [String], default: [] },
  experienceInYears: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;