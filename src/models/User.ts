import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode?: string;
  resetToken:string
  resetTokenExpiry?: Date;
  verifyCodeExpiry?: Date;
  extraFields?: Record<string, any>; // ✅ Dynamic fields support
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyCode: { type: String },
  verifyCodeExpiry: { type: Date },
  resetToken: { type: String, required: true },
  resetTokenExpiry:{ type: Date },

  // ✅ Dynamic fields
  extraFields: { type: Schema.Types.Mixed, default: {} },
});

// Ensure model is not compiled multiple times
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
