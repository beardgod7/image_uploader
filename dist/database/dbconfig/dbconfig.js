"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnection = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        await mongoose_1.default.connect(dbUrl, {});
        console.log('Database is connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
exports.default = DbConnection;
