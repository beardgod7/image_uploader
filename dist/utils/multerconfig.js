"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true); // File type allowed
        }
        else {
            const error = new Error('Only JPG, PNG, and GIF are allowed.');
            error.name = 'FileTypeError'; // Custom error name
            cb(error, false); // File type not allowed
        }
    },
});
exports.default = upload;
