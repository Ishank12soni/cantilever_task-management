const express = require('express');
const jwt = require('jsonwebtoken');
const mockData = require('../mockData');
const config = require('../config');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all tasks for authenticated user with filtering and sorting
router.get('/', verifyToken, async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      search: req.query.search,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc'
    };

    const tasks = mockData.tasks.findByUserWithFilters(req.userId, filters);
    
    // Add author info
    const tasksWithAuthors = tasks.map(task => ({
      ...task,
      author: mockData.users.findById(task.user) || { username: 'Unknown' }
    }));

    res.json({ tasks: tasksWithAuthors });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single task
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const task = mockData.tasks.findById(parseInt(req.params.id));
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const taskWithAuthor = {
      ...task,
      author: mockData.users.findById(task.user) || { username: 'Unknown' }
    };

    res.json({ task: taskWithAuthor });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new task
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, tags } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = mockData.tasks.create({
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags || [],
      user: req.userId
    });

    const taskWithAuthor = {
      ...task,
      author: mockData.users.findById(task.user) || { username: 'Unknown' }
    };

    res.status(201).json({ task: taskWithAuthor });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, tags } = req.body;

    const task = mockData.tasks.findById(parseInt(req.params.id));

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTask = mockData.tasks.update(parseInt(req.params.id), {
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      status: status !== undefined ? status : task.status,
      priority: priority !== undefined ? priority : task.priority,
      dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : task.dueDate,
      tags: tags !== undefined ? tags : task.tags
    });

    const taskWithAuthor = {
      ...updatedTask,
      author: mockData.users.findById(updatedTask.user) || { username: 'Unknown' }
    };

    res.json({ task: taskWithAuthor });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete task
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = mockData.tasks.findById(parseInt(req.params.id));

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    mockData.tasks.delete(parseInt(req.params.id));

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get task statistics
router.get('/stats/overview', verifyToken, async (req, res) => {
  try {
    const stats = mockData.tasks.getStats(req.userId);
    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
