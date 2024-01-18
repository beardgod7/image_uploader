"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMulterError = void 0;
// CustomMulterError.ts
const multer_1 = require("multer");
class CustomMulterError extends multer_1.MulterError {
    constructor(message) {
        super('LIMIT_UNEXPECTED_FILE', message);
        this.name = 'CustomMulterError';
    }
}
exports.CustomMulterError = CustomMulterError;
