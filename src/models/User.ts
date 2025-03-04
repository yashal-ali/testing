import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyCode: String,
  verifyCodeExpiry: Date,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
