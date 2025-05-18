import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {
  validateRegister,
  validateLogin,
  verifyToken,
} from '../middleware/validation.js';
import Session from '../models/session.js';

const authRouter = Router();

authRouter.post('/register', validateRegister, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

authRouter.post('/login', validateLogin, (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

authRouter.post('/logout', verifyToken, async (req, res) => {
  try {
    const token = req.token;
    await Session.deleteOne({ token });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default authRouter;
