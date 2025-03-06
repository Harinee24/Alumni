const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes'); // Import message routes
const jobRoutes = require('./routes/jobRoutes'); // Import job routes

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// CORS Middleware Configuration
app.use(cors({
  origin: 'http://localhost:3000',  // Replace this with the URL of your React app
  methods: ['GET', 'POST'],
  credentials: true,  // Allow cookies to be sent with requests
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
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumnisphere', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', userRoutes);  // Authentication routes
app.use('/api/messages', messageRoutes);  // Messages routes
app.use('/api/jobs', jobRoutes);  // Job routes

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
