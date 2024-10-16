const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/authMiddleware')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const authControllers = require('../controllers/authControllers')

router.post('/register', catchAsync(authControllers.registerUser))
router.post('/login', catchAsync(authControllers.loginUser))
router.get('/check-auth', catchAsync(authControllers.checkAuth))
router.get('/logout', catchAsync(authControllers.logoutUser))

// Google OAuth login route
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

// Google OAuth callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authControllers.googleOAuthLogin, // Once authenticated, call this to generate the JWT
)

module.exports = router
