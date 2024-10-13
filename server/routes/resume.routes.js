const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');
const catchAsync = require('../utils/catchAsync');
const isLoggedIn = require('../middleware/authMiddleware');

router.post('/create-resume', isLoggedIn, catchAsync(resumeController.createResume));

module.exports = router;