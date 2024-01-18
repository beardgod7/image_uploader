"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json({
            success: false,
            message: "errorr"
        });
    }
    else {
        next(err);
    }
};
exports.default = handleMulterError;
