import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import ErrorHandler from '../utils/ErrorHandler';

const handleMulterError = (
    err: MulterError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof MulterError) {
      // Handle Multer-specific errors
      const multerError = new ErrorHandler(`Invalid file type. ${err.message}`, 400);
      res.status(multerError.statusCode).json({
        success: false,
        message: multerError.message,
      });
    } else {
      // Pass other errors to the next middleware
      next(err);
    }
  };
  
export default handleMulterError;
