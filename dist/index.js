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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const authService_1 = require("./services/authService");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        // Register a new user
        const result = yield (0, authService_1.registerUser)("Johnthn", "Doethn", "johndoethn", "john@12example.com", "password123");
        console.log(result);
        // Login the user
        const { user: loggedInUser, token } = yield (0, authService_1.loginUser)("john@example.com", "password123");
        console.log("🟢 Logged In User:", loggedInUser);
        console.log("🟢 Token:", token);
        // Verify the token
        const decodedUser = (0, authService_1.verifyToken)(token);
        console.log("🟢 Decoded Token User:", decodedUser);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
    }
});
start();
