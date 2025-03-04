"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.resetPassword = exports.verifyUser = exports.registerUser = void 0;
const authService_1 = require("./services/authService");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return authService_1.registerUser; } });
Object.defineProperty(exports, "verifyUser", { enumerable: true, get: function () { return authService_1.verifyUser; } });
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return authService_1.resetPassword; } });
Object.defineProperty(exports, "forgotPassword", { enumerable: true, get: function () { return authService_1.forgotPassword; } });
// Default export (optional)
exports.default = { registerUser: authService_1.registerUser, verifyUser: authService_1.verifyUser, resetPassword: authService_1.resetPassword, forgotPassword: authService_1.forgotPassword };
