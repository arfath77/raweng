import { useState, useEffect } from 'react';
import { getToken } from '../utils';
import { Navigate } from 'react-router-dom';
import API from '../api';
import { Container, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
        Test
      </Modal>
      <Group position="space-between" mb="xl">
        <Title order={2}>Your Tasks</Title>
        <Button variant="default" onClick={open}>
          Add Task
        </Button>
      </Group>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};
