import express, { Router, Request, Response ,NextFunction} from 'express';
import User from '../database/model/user';
import upload from '../utils/multerconfig'; 
import handleMulterError from '../utils/multererror';
import ErrorHandler from '../utils/ErrorHandler';
const router: Router = express.Router();

router.post('/upload', handleMulterError,upload.single('Image'), async (req: Request, res: Response, next: NextFunction):Promise<void> => {
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

    const newUser = new User({ name,Image });
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: 'image uploaded succesfully',
      data: {
        id: savedUser._id,
      },
    });
    
  } catch (error) {
    
    console.error('Error uploading image:');
    res.status(500).json({ error: 'ERROR  UPLOADING IMAGE' });
  }
});

router.get('/get_image/:userId', async(req: Request, res: Response, next: NextFunction):Promise<void>  => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.Image) {
      res.status(404).json({ error: 'User or image not found' });
    }

    // Respond with a secure URL format (base64 encoding)
    const base64Image = Buffer.from(user!.Image.data).toString('base64');
    const imageUrl = `data:${user!.Image.contentType};base64,${base64Image}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// routes/imageRoutes.ts
router.get('/get_all_images', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});

    if (!users) {
      throw new ErrorHandler('No images found', 404);
    }

    const imagesWithIds = users.map((user) => {
      const base64Image = Buffer.from(user.Image.data).toString('base64');
      const imageUrl = `data:${user.Image.contentType};base64,${base64Image}`;
      return { id: user._id, imageUrl };
    });

    res.json({ imagesWithIds });
  } catch (error) {
    next(error);
  }
});

  export default router
  
