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
  const existingPayment = await Payment.findOne({ userId });
  if (existingPayment) {
    // If a payment record exists for the user, throw an error
    throw new ExpressError(400, false, "User has already paid.");
  }
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
    premiumCategory,
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
      // Log payment to Payment model
      await Payment.create({
        userId: userId,
        paymentDate: new Date(),
        expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Set expiry date 1 month ahead
        premiumCategory, // Example premium category
        expired: false,
      });
      res.redirect(`${process.env.FRONTEND_URL}/templates`);
      return res.json({
        success: true,
        message: "Payment verified, user upgraded to premium.",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid payment signature.",
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed." });
  }
};

exports.checkPremium = async (req, res) => {
  res.status(200).json({ success: true, message: "User is a premium holder." });
};

exports.getKey = async (req, res) => {
  res.send({ key: process.env.PAYMENT_API_KEY });
};
