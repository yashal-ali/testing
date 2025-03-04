import mongoose from "mongoose";
/**
 * Registers a new user
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param userName - Unique username
 * @param email - Unique email
 * @param password - Plain text password
 * @returns Success or failure response
 */
export declare const registerUser: (firstName: string, lastName: string, userName: string, email: string, password: string, extraFields?: {
    businessCards?: mongoose.Types.ObjectId[];
    contacts?: mongoose.Types.ObjectId[];
    membership?: mongoose.Types.ObjectId;
}) => Promise<{
    success: boolean;
    message: string;
    verifyCode?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    verifyCode: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
    verifyCode?: undefined;
}>;
export declare const verifyUser: (userName: string, code: string) => Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
}>;
export declare const resetPassword: (token: string, newPassword: string) => Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
}>;
export declare const forgotPassword: (email: string) => Promise<{
    success: boolean;
    message: string;
    resetLink?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    resetLink: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
    resetLink?: undefined;
}>;
