"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resources not found with this id.. Invalid ${err.path}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
