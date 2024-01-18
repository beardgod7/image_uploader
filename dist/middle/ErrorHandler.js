"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer_1.default.MulterError) {
        res.status(400).json({ error: 'Invalid file type. Only JPG, PNG, and GIF are allowed.' });
    }
    else {
        next(error);
    }
};
exports.default = handleMulterError;
