import { registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService";
export { registerUser, verifyUser, resetPassword, forgotPassword };
declare const _default: {
    registerUser: (firstName: string, lastName: string, userName: string, email: string, password: string) => Promise<{
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
