import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { connectDB } from "../config/database";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Registers a new user
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param userName - Unique username
 * @param email - Unique email
 * @param password - Plain text password
 * @returns Success or failure response
 */


export const registerUser = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  extraFields?: Record<string, any> // ✅ Allow any extra fields
) => {
  try {
    console.log("📌 Received Data:", { firstName, lastName, userName, email, password, extraFields });

    if (!firstName || !lastName || !userName || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 3600000);

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return { success: false, message: "Email is already associated with a verified account." };
      } else {
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;
        existingUserByEmail.extraFields = extraFields || {}; // ✅ Store extra fields dynamically
        await existingUserByEmail.save();
        return { success: true, message: "Verification code resent to email." };
      }
    }

    // ✅ Create new user with dynamic fields
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry,
      isVerified: false,
      extraFields: extraFields || {}, // ✅ Store extra fields dynamically
    });
    const userId=newUser._id
    console.log("🟢 Saving User to MongoDB:", newUser);
    await newUser.save();

    return { success: true, message: "User registered successfully!", verifyCode ,userId  };
  } catch (error: any) {
    console.error("❌ Error registering user:", error);
    return { success: false, message: "An error occurred.", error: error.message };
  }
};



export const verifyUser = async (userName: string, code: string) => {
  try {
    // Connect to the database
    await connectDB();

    console.log("📌 Received Data:", { userName, code });

    // Ensure required fields are provided
    if (!userName || !code) {
      console.error("❌ Missing required fields");
      return { success: false, message: "Username and code are required." };
    }
    const decodedUsername = decodeURIComponent(userName);

    // Find the user by username
    const user = await User.findOne({ userName: decodedUsername });
    if (!user) {
      console.error("❌ User not found");
      return { success: false, message: "User not found." };
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      console.log("✅ Account verified successfully:", userName);
      return { success: true, message: "Account verified successfully!" };
    } 
    
    if (!isCodeNotExpired) {
      console.warn("⚠️ Verification code expired for:", userName);
      return {
        success: false,
        message: "Verification code expired. Please request a new code.",
      };
    } 
    
    console.warn("⚠️ Incorrect verification code for:", userName);
    return { success: false, message: "Incorrect verification code." };
  } catch (error: any) {
    console.error("❌ Error verifying user:", error);
    return { success: false, message: "Error verifying user.", error: error.message };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    await connectDB();

    console.log("🔑 Reset Password Request:", { token, newPassword });
    const user = await User.findOne({ resetToken: token });
    if (!user || new Date(user.resetTokenExpiry) < new Date()) {
      console.error("❌ Invalid or expired reset token");
      return { success: false, message: "Invalid or expired reset token." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = uuidv4(); 
    await user.save();

    console.log("✅ Password reset successfully");
    return { success: true, message: "Password reset successfully." };
  } catch (error: any) {
    console.error("❌ Error resetting password:", error);
    return { success: false, message: "Error resetting password.", error: error.message };
  }
};
export const forgotPassword = async (email: string) => {
  try {
    await connectDB();

    console.log("📧 Forgot Password Request:", { email });

    const user = await User.findOne({ email });
    if (!user) {
      console.error("❌ User not found");
      return { success: false, message: "User not found." };
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    console.log("✅ Password reset email sent");
    return { success: true, message: "Password reset email sent." ,resetLink};
  } catch (error: any) {
    console.error("❌ Error in Forgot Password:", error);
    return { success: false, message: "Internal server error", error: error.message };
  }
};
