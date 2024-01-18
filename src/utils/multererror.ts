import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import ErrorHandler from '../utils/ErrorHandler';

const handleMulterError = (
  err: MulterError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: "errorr"
    });
  } else {
    next(err);
  }
};

export default handleMulterError;

