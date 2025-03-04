export { default as User } from "./models/User";
export { registerUser, verifyUser, resetPassword } from "./services/authService";
declare const _default: {
    registerUser: (firstName: string, lastName: string, userName: string, email: string, password: string, extraFields?: Record<string, any>) => Promise<{
        success: boolean;
        message: string;
        verifyCode?: undefined;
        userId?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        verifyCode: string;
        userId: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        verifyCode?: undefined;
        userId?: undefined;
    }>;
    verifyUser: (userName: string, code: string) => Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    resetPassword: (token: string, newPassword: string) => Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    forgotPassword: (email: string) => Promise<{
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
};
export default _default;
