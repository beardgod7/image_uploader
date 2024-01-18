"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const picture_1 = __importDefault(require("../database/model/picture"));
const multererror_1 = __importDefault(require("../utils/multererror"));
const multerconfig_1 = __importDefault(require("../utils/multerconfig"));
const router = express_1.default.Router();
router.post('/upload', multererror_1.default, multerconfig_1.default.single('Image'), async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            res.status(200).json({ error: 'No file provided' });
            return;
        }
        const Image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
        const newPicture = new picture_1.default({ name, Image });
        const savedPicture = await newPicture.save();
        res.status(201).json({
            success: true,
            message: 'image uploaded succesfully',
            data: {
                id: savedPicture._id,
            },
        });
    }
    catch (error) {
        let errorMessage = 'Error uploading image';
        if (error.message === 'Invalid file type. Only JPG, PNG, and GIF are allowed.') {
            errorMessage = 'Invalid file type. Only JPG, PNG, and GIF are allowed.';
            res.status(200).json({ error: errorMessage });
        }
        console.error('Error uploading image:', error.message);
    }
});
router.get('/get_image/:pictureId', async (req, res, next) => {
    try {
        const pictureId = req.params.pictureId;
        if (!mongoose_1.default.Types.ObjectId.isValid(pictureId)) {
            res.status(200).json({ error: 'Invalid pictureId format' });
            return;
        }
        const picture = await picture_1.default.findById(pictureId);
        if (!picture || !picture.Image) {
            res.status(200).json({ error: 'image not found' });
        }
        // Respond with a secure URL format (base64 encoding)
        const base64Image = Buffer.from(picture.Image.data).toString('base64');
        const imageUrl = `data:${picture.Image.contentType};base64,${base64Image}`;
        res.json({ imageUrl });
    }
    catch (error) {
        res.status(200).json({ error: 'system error' });
    }
});
exports.default = router;
