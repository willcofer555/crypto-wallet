import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Assuming you have a User model

interface RequestWithUser extends Request {
    user: any; // Replace 'any' with the type of your 'user' object
  }

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            throw new Error();
        }
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'SaasWallet2024');
      const user = await User.findById(decoded.id);
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
// Example function to register a new user
export const registerUser = (req: Request, res: Response) => {
  // Implement user registration logic here
  res.json({ message: 'User registered successfully' });
};

// Example function to login a user
export const loginUser = async (req: Request, res: Response) => {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
  
      // Validate user input
      if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
      }
  
      // Check if user with provided email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'SaasWallet2024', { expiresIn: '1h' });
  
      // Return token and user data
      res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Example function to logout a user
export const logoutUser = (req: Request, res: Response) => {
  // Implement user logout logic here
  res.json({ message: 'User logged out successfully' });
};
