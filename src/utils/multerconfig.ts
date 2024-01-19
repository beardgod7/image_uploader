import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // File type allowed
    } else {
      const error = new Error('Only JPG, PNG, and GIF are allowed.');
      error.name = 'FileTypeError'; // Custom error name
      cb(error as unknown as null, false); // File type not allowed
    }
  },
});




export default upload;
 