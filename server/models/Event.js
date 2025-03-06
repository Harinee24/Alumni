const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventTopic: {
    type: String,
    required: true,
  },
  degreeAndYear: {
    type: String,
    required: true,
  },
  expectedStudents: {
    type: String, // Format can be something like "BSc, 2020-2024"
    required: true,
  },
  eventDateTime: {
    type: Date,
    required: true,
  },
  additionalNotes: {
    type: String,
    required: false,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
