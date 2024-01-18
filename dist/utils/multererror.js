"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer_1.MulterError) {
        // Handle Multer-specific errors
        const multerError = new ErrorHandler_1.default(`Invalid file type. ${err.message}`, 400);
        res.status(multerError.statusCode).json({
            success: false,
            message: multerError.message,
        });
    }
    else {
        // Pass other errors to the next middleware
        next(err);
    }
};
exports.default = handleMulterError;
