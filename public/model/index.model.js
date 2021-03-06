"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LoginSchema = new mongoose_1.default.Schema({
    username: { type: String,
        required: true,
        unique: true },
    email: { type: String,
        required: true },
    password: { type: Number,
        required: true }
});
exports.User = mongoose_1.default.model('Users', LoginSchema);
