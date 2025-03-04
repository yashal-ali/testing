import jwt from "jsonwebtoken";
/**
 * Registers a new user
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param userName - Unique username
 * @param email - Unique email
 * @param password - Plain text password
 * @returns Success or failure response
 */
export declare const registerUser: (firstName: string, lastName: string, userName: string, email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
}>;
/**
 * Logs in a user
 * @param email - User's email
 * @param password - Plain text password
 * @returns A JWT token and user details
 */
export declare const loginUser: (email: string, password: string) => Promise<{
    user: {
        id: any;
        name: any;
        email: any;
    };
    token: string;
}>;
/**
 * Verifies a JWT token
 * @param token - JWT token to verify
 * @returns Decoded user data
 */
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
