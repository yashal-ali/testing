"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.resetPassword = exports.verifyUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Registers a new user
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param userName - Unique username
 * @param email - Unique email
 * @param password - Plain text password
 * @returns Success or failure response
 */
const registerUser = (firstName, lastName, userName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📌 Received Data:", { firstName, lastName, userName, email, password });
        yield (0, database_1.connectDB)();
        // Ensure required fields are provided
        if (!firstName || !lastName || !userName || !email || !password) {
            console.error("❌ Missing required fields");
            return { success: false, message: "All fields are required." };
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
        const existingUserByEmail = yield User_1.default.findOne({ email });
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return {
                    success: false,
                    message: "Email is already associated with a verified account.",
                };
            }
            else {
                // Update the existing unverified user
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;
                yield existingUserByEmail.save();
                return { success: true, message: "Verification code resent to email.", verifyCode };
            }
        }
        // Create new user
        const newUser = new User_1.default({
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
        yield newUser.save();
        return { success: true, message: "User registered successfully!", verifyCode };
    }
    catch (error) {
        console.error("❌ Error registering user:", error);
        return { success: false, message: "An error occurred.", error: error.message };
    }
});
exports.registerUser = registerUser;
const verifyUser = (userName, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the database
        yield (0, database_1.connectDB)();
        console.log("📌 Received Data:", { userName, code });
        // Ensure required fields are provided
        if (!userName || !code) {
            console.error("❌ Missing required fields");
            return { success: false, message: "Username and code are required." };
        }
        const decodedUsername = decodeURIComponent(userName);
        // Find the user by username
        const user = yield User_1.default.findOne({ userName: decodedUsername });
        if (!user) {
            console.error("❌ User not found");
            return { success: false, message: "User not found." };
        }
        // Check if the code is correct and not expired
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            yield user.save();
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
    }
    catch (error) {
        console.error("❌ Error verifying user:", error);
        return { success: false, message: "Error verifying user.", error: error.message };
    }
});
exports.verifyUser = verifyUser;
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        console.log("🔑 Reset Password Request:", { token, newPassword });
        const user = yield User_1.default.findOne({ resetToken: token });
        if (!user || new Date(user.resetTokenExpiry) < new Date()) {
            console.error("❌ Invalid or expired reset token");
            return { success: false, message: "Invalid or expired reset token." };
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = (0, uuid_1.v4)();
        yield user.save();
        console.log("✅ Password reset successfully");
        return { success: true, message: "Password reset successfully." };
    }
    catch (error) {
        console.error("❌ Error resetting password:", error);
        return { success: false, message: "Error resetting password.", error: error.message };
    }
});
exports.resetPassword = resetPassword;
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        console.log("📧 Forgot Password Request:", { email });
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.error("❌ User not found");
            return { success: false, message: "User not found." };
        }
        const resetToken = (0, uuid_1.v4)();
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        yield user.save();
        const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
        console.log("✅ Password reset email sent");
        return { success: true, message: "Password reset email sent.", resetLink };
    }
    catch (error) {
        console.error("❌ Error in Forgot Password:", error);
        return { success: false, message: "Internal server error", error: error.message };
    }
});
exports.forgotPassword = forgotPassword;
