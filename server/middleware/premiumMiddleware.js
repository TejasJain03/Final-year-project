const User = require('../models/users.model');
const Payment = require('../models/payment.model');
const ExpressError = require('../utils/ExpressError');

const isPremium = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ExpressError(404, false, 'User not found');
    }

    const payment = await Payment.findOne({ userId: user._id });
    if (!payment) {
      return res.status(200).json({ success: false, premiumStatus : false ,message: 'You are not a premium user!'});
    }

    const currentDate = new Date();
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // Approximate month in milliseconds

    if (currentDate - payment.paymentDate > oneMonthInMs || currentDate > payment.expiryDate) {
      payment.expired = true;
      await payment.save();
      throw new ExpressError(401, false, 'Your premium has expired');
    }

    req.isPremium = true;
    req.premiumCategory = payment.premiumCategory;

    next();
  } catch (error) {
    if (error instanceof ExpressError) {
      return res.status(error.statusCode).json({ success: error.success, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Error checking premium status' });
  }
};

module.exports = isPremium;
