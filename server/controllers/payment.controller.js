const User = require("../models/users.model");
const ExpressError = require("../utils/ExpressError");
const { sendPremiumMail } = require("../utils/sendEmail");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment.model");

exports.buyPremium = async (req, res) => {
  const { premiumType } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ExpressError(404, false, "User not found");
  }
  const { userName, email } = user;
  const info = await sendPremiumMail(userName, email, premiumType);
  if (!info) throw new ExpressError(500, false, "Error sending premium mail");

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
};
const razorpay = new Razorpay({
  key_id: process.env.PAYMENT_API_KEY,
  key_secret: process.env.PAYMENT_SECRET_KEY,
});

exports.createOrder = async (req, res) => {
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user's details
  // If the user hasn't paid, proceed to create an order
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: `paymentorder${userId}`,
  };

  const response = await razorpay.orders.create(options);
  if (response.error) {
    console.log(response.error);
    throw new ExpressError(500, false, "Failed to create order.");
  } else {
    res.send(response);
  }
};

exports.paymentVerification = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    
  } = req.body;
  try {
    // Create HMAC signature to validate authenticity
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "UKTbLcz90bxadSWJrS76VTCm")
      .update(body.toString())
      .digest("hex");

    // Update logic: check if signature matches
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Get the user ID from req.user
      const userId = req.user._id;
      // Determine credits based on the payment amount
      const creditsToAdd = req.params.amount == 500 ? 10 : 20;

      // Check if a payment record already exists for the user
      const existingPayment = await Payment.findOne({ userId: userId });
      if (existingPayment) {
        // Add credits to the existing payment record
        existingPayment.credits += creditsToAdd;
        existingPayment.paymentDate = new Date(); // Update payment date if needed
        await existingPayment.save();
      } else {
        // Create a new payment record
        await Payment.create({
          userId: userId,
          paymentDate: new Date(),
          credits: creditsToAdd,
        });
      }

      // Send single response
      res.redirect(`${process.env.FRONTEND_URL}/templates`);
    } else {
      res.json({
        success: false,
        message: "Invalid payment signature.",
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed.",
    });
  }
};

exports.checkPremium = async (req, res) => {
  res.status(200).json({ success: true, message: "User is a premium holder." });
};

exports.getKey = async (req, res) => {
  res.send({ key: process.env.PAYMENT_API_KEY });
};
