import {  registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService";
export { default as User } from "./models/User"; // ✅ Export User Model
export { registerUser, verifyUser, resetPassword } from "./services/authService";
export default { registerUser, verifyUser, resetPassword, forgotPassword}
