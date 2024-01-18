import mongoose from 'mongoose';
import express, { Router, Request, Response ,NextFunction} from 'express';
import Picture from '../database/model/picture';
import upload from '../utils/multerconfig'; 
import handleMulterError from '../utils/multererror';
import ErrorHandler from '../utils/ErrorHandler';
const router: Router = express.Router();

router.post('/upload', handleMulterError,upload.single('Image'), async (req: Request, res: Response, next: NextFunction):Promise<void> => {
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

    const newPicture = new Picture({ name,Image });
    const savedPicture = await newPicture.save();
    res.status(201).json({
      success: true,
      message: 'image uploaded succesfully',
      data: {
        id: savedPicture._id,
      },
    }); 
  } catch (error) {
    const errorMessage = (error as Error)?.message || 'Unknown error';
    if (errorMessage === 'Invalid file type. Only JPG, PNG, and GIF are allowed.') {
      res.status(200).json({ error:'invalid file type file must be JPG,PNG and GIF'});
    } else {
      console.error('Error uploading image:', errorMessage);
      res.status(200).json({ error: 'Error uploading image. Please try again later.' });
    }
  }
});

router.get('/get_image/:pictureId', async(req: Request, res: Response, next: NextFunction):Promise<void>  => {
  try {
    const pictureId = req.params.pictureId;

    if (!mongoose.Types.ObjectId.isValid(pictureId)) {
      res.status(200).json({ error: 'Invalid pictureId format' });
      return;
    }

    const picture = await Picture.findById(pictureId);

    if (!picture || !picture.Image) {
      res.status(200).json({ error: 'image not found' });
    }

    // Respond with a secure URL format (base64 encoding)
    const base64Image = Buffer.from(picture!.Image.data).toString('base64');
    const imageUrl = `data:${picture!.Image.contentType};base64,${base64Image}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(200).json({ error: '' });
  }
});

  export default router
  
