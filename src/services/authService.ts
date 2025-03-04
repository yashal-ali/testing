import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

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
  password: string
) => {
  try {
    console.log("📌 Received Data:", { firstName, lastName, userName, email, password });

    // Ensure required fields are provided
    if (!firstName || !lastName || !userName || !email || !password) {
      console.error("❌ Missing required fields");
      return { success: false, message: "All fields are required." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return {
          success: false,
          message: "Email is already associated with a verified account.",
        };
      } else {
        // Update the existing unverified user
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;
        await existingUserByEmail.save();
        return { success: true, message: "Verification code resent to email." };
      }
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry,
      isVerified: false,
    });

    console.log("🟢 Before Saving to MongoDB:", newUser);
    await newUser.save();

    return { success: true, message: "User registered successfully!" };
  } catch (error: any) {
    console.error("❌ Error registering user:", error);
    return { success: false, message: "An error occurred.", error: error.message };
  }
};

/**
 * Logs in a user
 * @param email - User's email
 * @param password - Plain text password
 * @returns A JWT token and user details
 */
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

  return { user: { id: user._id, name: user.userName, email: user.email }, token };
};

/**
 * Verifies a JWT token
 * @param token - JWT token to verify
 * @returns Decoded user data
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
