import React from 'react';
import API from '../api';

export default function TaskList({ tasks, setTasks }) {
  const toggleComplete = async task => {
    const res = await API.patch(`/tasks/${task.id}`, {
      completed: !task.completed,
    });
    setTasks(tasks.map(t => (t.id === task.id ? res.data : t)));
  };

  const deleteTask = async id => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span
            onClick={() => toggleComplete(task)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
