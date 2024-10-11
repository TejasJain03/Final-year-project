const mongoose = require("mongoose");
const validator = require("validator");
const ExpressError = require("../utils/ExpressError");

const InfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domain: { type: String },
    phoneNumber: {
      type: Number,
      validate: {
        validator: function (v) {
          const isValid = /^\d{10}$/.test(v);
          if (!isValid) {
            throw new ExpressError(
              400,
              false,
              "Phone number must be 10 digits long"
            );
          }
          return true;
        },
      },
    },
    github: {
      type: String,
      validate: {
        validator: function (v) {
          if (!validator.isURL(v)) {
            throw new ExpressError(400, false, "Invalid GitHub URL");
          }
          return true;
        },
      },
    },
    linkedin: {
      type: String,
      validate: {
        validator: function (v) {
          if (!validator.isURL(v)) {
            throw new ExpressError(400, false, "Invalid LinkedIn URL");
          }
          return true;
        },
      },
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
  },
  { timestamps: true }
);

const Info = mongoose.model("Info", InfoSchema);
module.exports = Info;
