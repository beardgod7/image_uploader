import express, { Router, Request, Response ,NextFunction} from 'express';
//import ErrorHandler from "../utils/ErrorHandler";
import User from '../database/model/user';
const router: Router = express.Router();

router.post('/reg', async (req: Request, res: Response, next: NextFunction)=> {
    try {
      const { firstName, email, password }: { firstName: string; email: string; password: string } = req.body;
  
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
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }
  
      // Create a new user record in the database
      const newUser = await User.create({
        firstName,
        email,
        password,
        id: 0, // Provide a default or use the actual ID if applicable
        createdAt: new Date(), // Provide the creation date
      });

  
      res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (error) {
      console.error('Error:', error);
      return next()
    }
  });

  export default router
  
