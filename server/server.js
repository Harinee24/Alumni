const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');  // Import user routes for login and registration
const messageRoutes = require('./routes/messageRoutes');  // Import message routes
const jobRoutes = require('./routes/jobRoutes');  // Import job routes
const eventRoutes = require('./routes/eventRoutes');  // Import event routes
const User = require('./models/User');  // Import the User model

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// CORS Middleware Configuration
app.use(cors({
  origin: 'http://localhost:3000',  // React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow methods including PUT
  credentials: true,  // Allow credentials (cookies, sessions)
}));

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cookieParser());  // Parse cookies

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a secret from env variable or fallback
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Set secure cookies only in production
    maxAge: 3600000, // 1 hour expiration
  }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumni-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', userRoutes);  // Authentication routes
app.use('/api/messages', messageRoutes);  // Messages routes
app.use('/api/jobs', jobRoutes);  // Job routes
app.use('/api/events', eventRoutes);  // Event routes (new route added for event management)

// Profile update route
app.put('/api/auth/profile', async (req, res) => {
  const { userId, preferredJobLocation, knownSkills, experienceInYear } = req.body;

  // Validate if userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user profile
    user.preferredJobLocation = preferredJobLocation || user.preferredJobLocation;
    user.knownSkills = knownSkills || user.knownSkills;
    user.experienceInYear = experienceInYear || user.experienceInYear;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('AlumniSphere API is running!');
});

// Catch all route for unhandled requests
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
