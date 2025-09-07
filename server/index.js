const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/authSimple');
const taskRoutes = require('./routes/tasksSimple');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Using mock data for now - no MongoDB connection needed
console.log('Using mock data storage for development');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Task Manager Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Task Manager Server running on port ${PORT}`);
});
