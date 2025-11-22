const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // ← add this to load .env

// Import routes
const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/activity_db';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/logs', logRoutes);
app.use('/stats', statsRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Database connection and server startup
mongoose
  .connect(MONGO_URI) // ← IMPORTANT: no options object here
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Backend server listening on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
