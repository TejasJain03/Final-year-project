const express = require('express')
const router = express.Router()
const authmiddleware = require('../middleware/authMiddleware')
const catchAsync = require('../utils/catchAsync')
const authControllers = require('../controllers/authControllers')

router.post('/register', catchAsync(authControllers.registerUser))
router.post('/login', catchAsync(authControllers.loginUser))


module.exports = router
