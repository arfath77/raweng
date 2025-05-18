import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import taskRouter from './routes/task.js';
import userRouter from './routes/user.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
});
