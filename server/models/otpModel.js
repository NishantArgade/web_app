import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  otp: String,
  otp_expiry: Date,
});

export const OTP = mongoose.models.OTPs || mongoose.model("OTPs", otpSchema);
