"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import ErrorHandler from "../utils/ErrorHandler";
const user_1 = __importDefault(require("../database/model/user"));
const router = express_1.default.Router();
router.post('/reg', async (req, res, next) => {
    try {
        const { firstName, email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required fields.' });
        }
        // Validate email format (you can use a library like validator for more comprehensive validation)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        // Check if the email is already in use
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }
        // Create a new user record in the database
        const newUser = await user_1.default.create({
            firstName,
            email,
            password,
            id: 0, // Provide a default or use the actual ID if applicable
            createdAt: new Date(), // Provide the creation date
        });
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    }
    catch (error) {
        console.error('Error:', error);
        return next();
    }
});
exports.default = router;
