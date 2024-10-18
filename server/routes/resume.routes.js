const express = require('express');
const router = express.Router();
const {createResume, sendResume} = require('../controllers/resume.controller');
const catchAsync = require('../utils/catchAsync');
const isLoggedIn = require('../middleware/authMiddleware');

router.post('/create-resume', isLoggedIn, catchAsync(createResume));
// add isLoggedIn middleware
router.post('/send-resume', isLoggedIn, catchAsync(sendResume));

module.exports = router;