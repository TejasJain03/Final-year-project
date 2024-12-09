const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const ExpressError = require('../utils/ExpressError')
require('dotenv').config()

const protect = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ExpressError(401, 'Not authenticated'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ExpressError(401, 'Token expired or invalid'));
  }
};

module.exports = protect;
