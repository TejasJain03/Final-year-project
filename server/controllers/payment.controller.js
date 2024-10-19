const User = require("../models/users.model");
const ExpressError = require("../utils/ExpressError");
const { sendPremiumMail } = require("../utils/sendEmail");
const Razorpay = require("razorpay");
const crypto = require("crypto");

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

exports.creatOrder = async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_receipt_123",
  };

  const response = await razorpay.orders.create(options);
  if (response.error) {
    console.log(response.error);
  } else {
    res.send(response);
  }
};

exports.getKey = async (req, res) => {
  res.send({ key: process.env.PAYMENT_API_KEY });
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "UKTbLcz90bxadSWJrS76VTCm")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  res.json(isAuthentic);
};


exports.checkPremium = async (req, res) => {
  res.status(200).json({success: true, message: "User is a premium holder."});
}