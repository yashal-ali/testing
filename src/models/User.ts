import mongoose, { Schema, Document } from "mongoose";

// Define the User schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyCode: String,
  verifyCodeExpiry: Date,
});

// Ensure the model is created only once
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User; // ✅ Export User Model
