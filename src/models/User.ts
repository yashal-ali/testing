import mongoose, { Schema, Document } from "mongoose";

// Define a base interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  extraFields?: Record<string, any>; // 🔹 Dynamic Fields
}

// Base User Schema
const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyCode: String,
    verifyCodeExpiry: Date,
    extraFields: { type: Object, default: {} }, // 🔹 Allows adding new fields dynamically
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
