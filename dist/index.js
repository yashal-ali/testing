"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.forgotPassword = exports.resetPassword = exports.verifyUser = exports.registerUser = void 0;
const authService_1 = require("./services/authService");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return authService_1.registerUser; } });
Object.defineProperty(exports, "verifyUser", { enumerable: true, get: function () { return authService_1.verifyUser; } });
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return authService_1.resetPassword; } });
Object.defineProperty(exports, "forgotPassword", { enumerable: true, get: function () { return authService_1.forgotPassword; } });
const User_1 = __importDefault(require("./models/User"));
exports.User = User_1.default;
exports.default = { registerUser: authService_1.registerUser, verifyUser: authService_1.verifyUser, resetPassword: authService_1.resetPassword, forgotPassword: authService_1.forgotPassword, User: User_1.default };
