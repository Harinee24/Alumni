const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');  
const messageRoutes = require('./routes/messageRoutes');  
const jobRoutes = require('./routes/jobRoutes');  
const eventRoutes = require('./routes/eventRoutes');  

// Load environment variables
dotenv.config();

const app = express();

// ---------------- Middleware ----------------
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // important for session cookies
}));

app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 hour
  }
}));

// Serve uploaded files as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------------- Database ----------------
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumni-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// ---------------- Routes ----------------
app.use('/api/auth', userRoutes);  
app.use('/api/messages', messageRoutes);  
app.use('/api/jobs', jobRoutes);  
app.use('/api/events', eventRoutes);  

// Default route
app.get('/', (req, res) => {
  res.send('AlumniSphere API is running!');
});

// Catch all route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));