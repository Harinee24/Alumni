// const express = require('express');
// const Message = require('../models/Message');  // Assuming you have the Message model
// const router = express.Router();

// // Middleware to check if the user is authenticated
// const isAuthenticated = (req, res, next) => {
//   console.log(req.session.user); // Debugging session
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   next();
// };

// // POST: Send a message
// router.post('/', isAuthenticated, async (req, res) => {
//   try {
//     const { content } = req.body;

//     // Validate that the message content is provided
//     if (!content || content.trim() === '') {
//       return res.status(400).json({ message: 'Content is required' });
//     }

//     const userId = req.session.user._id;  // Access user info from session
//     console.log('Sender User ID:', userId);  // Check if userId is populated correctly

//     if (!userId) {
//       return res.status(400).json({ message: 'Sender not found in session' });
//     }

//     const newMessage = new Message({
//       sender: userId,  // The logged-in user's ID
//       content
//     });

//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error('Error in POST /api/messages:', error);  // Log detailed error
//     res.status(400).json({ message: 'Failed to send message', error: error.message });
//   }
// });


// // GET: Fetch all messages
// router.get('/', async (req, res) => {
//   try {
//     const messages = await Message.find()
//       .populate('sender', 'name email')  // Populate the sender details (Assuming 'User' model exists)
//       .sort({ timestamp: 1 }); // Sort by timestamp (oldest to newest)

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
//   }
// });

// module.exports = router;






const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDF, and Word documents are allowed'));
    }
  }
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// POST: Send a message with optional attachment
router.post('/', isAuthenticated, upload.single('attachment'), async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.session.user._id;

    if (!content && !req.file) {
      return res.status(400).json({ message: 'Message content or attachment is required' });
    }

    const newMessage = new Message({
      sender: userId,
      content: content || '',
      attachment: req.file ? req.file.filename : null
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
});

// GET: Fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email')
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// Serve uploaded files
router.use('/uploads', express.static(uploadDir));

module.exports = router;