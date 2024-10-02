const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentDate: { type: Date, required: [true, "Payment date is required"] },
    expiryDate: { type: Date, required: [true, "Expiry date is required"] },
    expired: { type: Boolean, default: false },
    premiumCategory: {
      type: Number,
      enum: {
        values: [0, 1, 2],
        message: "Premium category must be 0, 1, or 2",
      },
      default: 0,
    },
  },
  { timestamps: true }
);

PaymentSchema.pre("save", function (next) {
  if (this.paymentDate >= this.expiryDate) {
    next(
      new ExpressError(400, false, "Expiry date must be after the payment date")
    );
  } else {
    next();
  }
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
