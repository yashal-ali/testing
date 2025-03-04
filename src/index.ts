import { connectDB } from "./config/database";
import { registerUser, loginUser, verifyToken } from "./services/authService";

const start = async () => {
  try {
    await connectDB();

    // Register a new user
    const result = await registerUser("Johnthn", "Doethn", "johndoethn", "john@12example.com", "password123");
console.log(result);


    // Login the user
    const { user: loggedInUser, token } = await loginUser("john@example.com", "password123");
    console.log("🟢 Logged In User:", loggedInUser);
    console.log("🟢 Token:", token);

    // Verify the token
    const decodedUser = verifyToken(token);
    console.log("🟢 Decoded Token User:", decodedUser);
  } catch (error:any) {
    console.error("❌ Error:", error.message);
  }
};

start();
