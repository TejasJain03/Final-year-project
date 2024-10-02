const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Generate token after registration
    generateToken(res, user._id);
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token on successful login
    generateToken(res, user._id);
    res.status(200).json({ success: true, message: 'User logged in successfully' });
  } catch (error) {
    console.error('Login Error: ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('access_token', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: 'User logged out successfully' });
});

router.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'Access granted', userId: req.user.userId });
});

module.exports = router;
