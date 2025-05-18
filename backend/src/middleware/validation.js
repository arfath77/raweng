import zod from 'zod';
import User from '../models/user.js';
import Session from '../models/session.js';

const registerSchema = zod.object({
  name: zod
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: zod
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain letters' })
    .regex(/[0-9]/, { message: 'Password must contain numbers' })
    .regex(/[@$!%*?&]/, {
      message: 'Password must contain special characters',
    }),
});

export const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const { success, error } = registerSchema.parse({ email, password });
  if (!success) {
    return res.status(400).json({ message: error.errors[0].message });
  }

  next();
};

const loginSchema = zod.object({
  email: zod
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: zod.string(),
});

export const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const { success, error } = loginSchema.parse({ email, password });
  if (!success) {
    return res.status(400).json({ message: error.errors[0].message });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'No account exists' });
  }
  if (bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  req.user = user;

  next();
};

export const verifyToken = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  const bearer = authorization.split(' ');
  token = bearer[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.token = token;
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
