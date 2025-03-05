import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  resetToken: string;
  resetTokenExpiry?: Date;
  
  membership?: Types.ObjectId;
  businessCards?: Types.ObjectId[];
  contacts?: Types.ObjectId[];
  [key: string]: any; // ✅ Allows dynamic fields
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
  resetTokenExpiry: { type: Date },

  // ✅ Explicitly define top-level fields
  membership: { type: Schema.Types.ObjectId, ref: "Membership" },
  businessCards: { type: [Schema.Types.ObjectId], ref: "BusinessCard", default: [] },
  contacts: { type: [Schema.Types.ObjectId], ref: "Contact", default: [] },

  // ✅ Allows storing additional dynamic fields
}, { strict: false });

// Ensure model is not compiled multiple times
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
