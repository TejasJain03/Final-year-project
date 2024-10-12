const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');
const catchAsync = require('../utils/catchAsync');

router.post('/create-resume', catchAsync(resumeController.createResume));

module.exports = router;