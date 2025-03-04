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
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
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
                return { success: true, message: "Verification code resent to email." };
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
        return { success: true, message: "User registered successfully!" };
    }
    catch (error) {
        console.error("❌ Error registering user:", error);
        return { success: false, message: "An error occurred.", error: error.message };
    }
});
exports.registerUser = registerUser;
/**
 * Logs in a user
 * @param email - User's email
 * @param password - Plain text password
 * @returns A JWT token and user details
 */
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    return { user: { id: user._id, name: user.userName, email: user.email }, token };
});
exports.loginUser = loginUser;
/**
 * Verifies a JWT token
 * @param token - JWT token to verify
 * @returns Decoded user data
 */
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
