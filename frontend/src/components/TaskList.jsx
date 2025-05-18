import API from '../api';
import { Button, Checkbox, Text, UnstyledButton } from '@mantine/core';

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
          <UnstyledButton onClick={() => toggleComplete(task)}>
            <Checkbox
              checked={task.completed}
              onChange={() => {}}
              tabIndex={-1}
              size="md"
              mr="xl"
              styles={{ input: { cursor: 'pointer' } }}
              aria-hidden
            />

            <Text
              fw={500}
              mb={7}
              lh={1}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.name}
            </Text>
          </UnstyledButton>

          <Button onClick={() => deleteTask(task.id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}
