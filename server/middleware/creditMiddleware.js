const Payment = require("../models/payment.model"); // Adjust the path to your Payment model
const ExpressError = require("../utils/ExpressError");

const checkCredits = async (req, res, next) => {
  try {
    // Assuming req.user contains the authenticated user's ID
    const userId = req.user._id;
    const template = req.body.template;
    const paymentDetails = await Payment.findOne({ userId: userId });

    if (!paymentDetails) {
      throw new ExpressError(400, "Payment details not found for the user.");
    }

    const requiredCreditsTemplate = {
      1: 2,
      2: 5,
      3: 9,
      4: 7,
    };

    const requiredCredits = requiredCreditsTemplate[template];

    if (!requiredCredits) {
      throw new ExpressError(400, "Invalid template ID.");
    }

    // Check if the user has enough credits
    if (paymentDetails.credits < requiredCredits) {
      throw new ExpressError(
        403,false,
        "Insufficient credits to perform this operation."
      );
    }

    // Attach the required credits to the request object
    req.requiredCredits = requiredCredits;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkCredits;
