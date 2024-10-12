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
    domain: { 
      type: String,
      default: "",
      trim: true,
    },
    phoneNumber: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          if (v === "") return true;
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
      default: "",
      validate: {
        validator: function (v) {
          if (v === "") return true;
          if (!validator.isURL(v)) {
            throw new ExpressError(400, false, "Invalid GitHub URL");
          }
          return true;
        },
      },
    },
    linkedin: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          if (v === "") return true;
          if (!validator.isURL(v)) {
            throw new ExpressError(400, false, "Invalid LinkedIn URL");
          }
          return true;
        },
      },
    },
    city: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          if (v === "") return true;
          if (v.trim() === "") {
            throw new ExpressError(400, false, "City cannot be empty");
          }
          return true;
        },
      },
    },
    state: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          if (v === "") return true;
          if (v.trim() === "") {
            throw new ExpressError(400, false, "State cannot be empty");
          }
          return true;
        },
      },
    },
    country: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          if (v === "") return true;
          if (v.trim() === "") {
            throw new ExpressError(400, false, "Country cannot be empty");
          }
          return true;
        },
      },
    },
  },
  { timestamps: true }
);

const Info = mongoose.model("Info", InfoSchema);
module.exports = Info;
