const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

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
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Optionally, create a GET route to fetch all events (for admin dashboard or alumni view)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
