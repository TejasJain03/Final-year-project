const express = require("express");
const router = express.Router();
const { buyPremium } = require("../controllers/payment.controller");
const asyncHandler = require("../utils/catchAsync");
const isLoggedIn = require("../middleware/authMiddleware");
const catchAsync = require("../utils/catchAsync");
const paymentControllers = require("../controllers/payment.controller");

router.post("/buy-premium", isLoggedIn, asyncHandler(buyPremium));
router.get("/get-key", catchAsync(paymentControllers.getKey));
router.post("/create-order", catchAsync(paymentControllers.creatOrder));
router.post(
  "/paymentverification",
  catchAsync(paymentControllers.paymentVerification)
);

module.exports = router;
