"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendUserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the core user schema
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyCode: String,
    verifyCodeExpiry: Date,
    // ✅ Dynamic Fields for Extensions
    extraFields: { type: mongoose_1.default.Schema.Types.Mixed, default: {} },
}, { timestamps: true });
// ✅ Allow schema extension dynamically
const extendUserSchema = (extraFields) => {
    UserSchema.add(extraFields);
};
exports.extendUserSchema = extendUserSchema;
// ✅ Export the model (reuse existing if already created)
exports.default = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
