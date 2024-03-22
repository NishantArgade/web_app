import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  status: {
    type: String,
    enum: ["InPending", "OnBoarded"],
    default: "InPending",
  },
  role: {
    type: String,
    enum: ["user", "admin", "operator"],
    default: "user",
  },
  assigned_RM: { type: "String", default: "Nishant Argade" },
  password: String,
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
