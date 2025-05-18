import { Router } from 'express';
import Task from '../models/task.js';
import { verifyToken } from '../middleware/validation.js';

const taskRouter = Router();

taskRouter.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

taskRouter.post('/', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const newTask = await Task.create({
      name,
      userId,
    });

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

taskRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const userId = req.user.id;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

taskRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default taskRouter;
