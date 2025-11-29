// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  avatarUrl: { type: String, default: "" },
  bio: { type: String, default: "" },
  roles: { type: [String], default: ["user"] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
