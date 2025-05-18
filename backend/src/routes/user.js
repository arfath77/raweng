import { Router } from 'express';
import User from '../models/user.js';
import { verifyToken } from '../middleware/validation.js';

const userRouter = Router();

userRouter.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default userRouter;
