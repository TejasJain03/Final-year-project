const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const ExpressError = require('../utils/ExpressError');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (v) {
        if (!validator.isEmail(v)) {
          throw new ExpressError(400, false, 'Invalid email format');
        }
        return true;
      }
    }
  },
  userName: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(v)) {
          throw new ExpressError(400, false, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
        }
        return true;
      }
    }
  },
  premiumStatus: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

// Middleware to hash passwords before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(new ExpressError(500, false, 'Error hashing the password'));
  }
});

// Custom error handling for email uniqueness
UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern.email) {
      next(new ExpressError(400, false, 'Email must be unique'));
    } else {
      next(new ExpressError(500, false, 'An error occurred while saving the user'));
    }
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
