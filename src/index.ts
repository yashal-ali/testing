import { connectDB } from "./config/database";
import { registerUser, loginUser, verifyToken } from "./services/authService";

export { registerUser, loginUser, verifyToken } from "./services/authService";
