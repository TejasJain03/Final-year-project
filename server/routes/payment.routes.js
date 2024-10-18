const express = require('express');
const router = express.Router();
const { buyPremium } = require('../controllers/payment.controller');
const asyncHandler = require('../utils/catchAsync');
const isLoggedIn = require('../middleware/authMiddleware');

router.post('/buy-premium', isLoggedIn, asyncHandler(buyPremium))

module.exports = router;
