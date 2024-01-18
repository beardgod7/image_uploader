"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../database/model/user"));
const multerconfig_1 = __importDefault(require("../utils/multerconfig"));
const multererror_1 = __importDefault(require("../utils/multererror"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const router = express_1.default.Router();
router.post('/upload', multererror_1.default, multerconfig_1.default.single('Image'), async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            res.status(400).json({ error: 'No file provided' });
            return;
        }
        const Image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
        const newUser = new user_1.default({ name, Image });
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: 'image uploaded succesfully',
            data: {
                id: savedUser._id, // Assuming _id is the generated ID by MongoDB
            },
        });
        //res.json({ message: 'Image uploaded successfully' });
    }
    catch (error) {
        console.error('Error uploading image:');
        res.status(500).json({ error: 'ERROR  UPLOADING IMAGE' });
    }
});
router.get('/get_image/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await user_1.default.findById(userId);
        if (!user || !user.Image) {
            res.status(404).json({ error: 'User or image not found' });
        }
        // Respond with a secure URL format (base64 encoding)
        const base64Image = Buffer.from(user.Image.data).toString('base64');
        const imageUrl = `data:${user.Image.contentType};base64,${base64Image}`;
        res.json({ imageUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// routes/imageRoutes.ts
router.get('/get_all_images', async (req, res, next) => {
    try {
        const users = await user_1.default.find({});
        if (!users) {
            throw new ErrorHandler_1.default('No images found', 404);
        }
        const imagesWithIds = users.map((user) => {
            const base64Image = Buffer.from(user.Image.data).toString('base64');
            const imageUrl = `data:${user.Image.contentType};base64,${base64Image}`;
            return { id: user._id, imageUrl };
        });
        res.json({ imagesWithIds });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
