const express = require("express");
const router = express.Router();
const { buyPremium } = require("../controllers/payment.controller");
const asyncHandler = require("../utils/catchAsync");
const isLoggedIn = require("../middleware/authMiddleware");
const isPremium = require("../middleware/premiumMiddleware");
const catchAsync = require("../utils/catchAsync");
const paymentControllers = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/buy-premium", isLoggedIn, asyncHandler(buyPremium));
router.get("/get-key", catchAsync(paymentControllers.getKey));
router.post("/create-order", catchAsync(paymentControllers.creatOrder));
router.post(
  "/paymentverification",
  authMiddleware,
  catchAsync(paymentControllers.paymentVerification)
);
router.get(
  "/check-premium",
  isLoggedIn,
  isPremium,
  paymentControllers.checkPremium
);
module.exports = router;
