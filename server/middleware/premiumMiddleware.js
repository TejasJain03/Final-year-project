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

    if(payment.credits <= 0) {
      return res.status(200).json({ success: false, premiumStatus : false ,message: 'You have no credits left! Please buy credits to continue.'});
    }

    req.credits = payment.credits;

    next();
  } catch (error) {
    if (error instanceof ExpressError) {
      return res.status(error.statusCode).json({ success: error.success, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Error checking premium status' });
  }
};

module.exports = isPremium;
