import {  registerUser, verifyUser, resetPassword, forgotPassword } from "./services/authService";
import User from "./models/User";
// Named exports
export { registerUser, verifyUser, resetPassword, forgotPassword, User}
export default { registerUser, verifyUser, resetPassword, forgotPassword , User}
