const express = require('express');
const router = express.Router();
const Event = require('../models/Event');  // Import Event model

// POST route to create a new event
router.post('/create-event', async (req, res) => {
  const { eventTopic, degreeAndYear, expectedStudents, eventDateTime, additionalNotes } = req.body;

  try {
    const newEvent = new Event({
      eventTopic,
      degreeAndYear,
      expectedStudents,
      eventDateTime,
      additionalNotes,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// GET route to fetch all events
router.get('/all-events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

module.exports = router;
