"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const authService_1 = require("./services/authService");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return authService_1.registerUser; } });
Object.defineProperty(exports, "loginUser", { enumerable: true, get: function () { return authService_1.loginUser; } });
Object.defineProperty(exports, "verifyToken", { enumerable: true, get: function () { return authService_1.verifyToken; } });
// Default export (optional)
exports.default = authService_1.registerUser;
