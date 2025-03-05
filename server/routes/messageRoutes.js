const express = require('express');
const Message = require('../models/Message');  // Assuming you have the Message model
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  console.log(req.session.user); // Debugging session
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// POST: Send a message
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { content } = req.body;

    // Validate that the message content is provided
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content is required' });
    }

    const userId = req.session.user._id;  // Access user info from session
    console.log('Sender User ID:', userId);  // Check if userId is populated correctly

    if (!userId) {
      return res.status(400).json({ message: 'Sender not found in session' });
    }

    const newMessage = new Message({
      sender: userId,  // The logged-in user's ID
      content
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in POST /api/messages:', error);  // Log detailed error
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
});


// GET: Fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email')  // Populate the sender details (Assuming 'User' model exists)
      .sort({ timestamp: 1 }); // Sort by timestamp (oldest to newest)

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

module.exports = router;

