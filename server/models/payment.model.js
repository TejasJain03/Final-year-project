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
    credits: { type: Number, required: [true, "Credits are required"] },
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
