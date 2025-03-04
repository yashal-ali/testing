"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyUser = exports.registerUser = exports.User = void 0;
const authService_1 = require("./services/authService");
var User_1 = require("./models/User"); // ✅ Export User Model
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
var authService_2 = require("./services/authService");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return authService_2.registerUser; } });
Object.defineProperty(exports, "verifyUser", { enumerable: true, get: function () { return authService_2.verifyUser; } });
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return authService_2.resetPassword; } });
exports.default = { registerUser: authService_1.registerUser, verifyUser: authService_1.verifyUser, resetPassword: authService_1.resetPassword, forgotPassword: authService_1.forgotPassword };
