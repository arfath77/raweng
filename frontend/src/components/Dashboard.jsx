import { useState, useEffect } from 'react';
import { getToken } from '../utils';
import { Navigate } from 'react-router-dom';
import API from '../api';
import { Container, Group, Title, Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TaskList from './TaskList';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (isAuthenticated) {
      API.get('/tasks')
        .then(res => setTasks(res.data))
        .catch(() => setIsAuthenticated(false));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={1140} py={'md'} px={0}>
      <Modal opened={opened} onClose={close} title="Add Task">
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const task = {
              name: formData.get('name'),
              completed: false,
            };
            API.post('/tasks', task)
              .then(res => {
                setTasks([...tasks, res.data]);
                close();
              })
              .catch(err => console.error(err));
          }}
        >
          <Group>
            <input name="name" placeholder="Task Name" required />
            <Button type="submit">Add Task</Button>
          </Group>
        </form>
      </Modal>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Your Tasks</Title>
        <Button variant="default" onClick={open}>
          Add Task
        </Button>
      </Group>
      {tasks.length === 0 ? (
        <Title order={3} color="dimmed">
          No tasks found
        </Title>
      ) : (
        <TaskList tasks={tasks} setTasks={setTasks} />
      )}
    </Container>
  );
};
