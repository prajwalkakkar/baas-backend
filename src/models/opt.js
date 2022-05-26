const mongoose = require("mongoose");
const validator = require("validator");

const otpSchema = new mongoose.Schema({
 email: {
  type: String,
  unique: true,
  required: true,
  trim: true,
  lowercase: true,
  validate(value) {
   if (!validator.isEmail(value)) {
    throw new Error("Email is invalid");
   }
  },
 },
 OTP: {
  type: Number,
  required: false,
 },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
