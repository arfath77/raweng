import API from '../api';
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  List,
  ListItem,
  Text,
  UnstyledButton,
} from '@mantine/core';

export default function TaskList({ tasks, setTasks }) {
  const toggleComplete = async task => {
    const res = await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  const deleteTask = async id => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <List listStyleType="none">
      {tasks.map(task => (
        <ListItem key={task._id}>
          <Card
            withBorder
            mb="md"
            p="md"
            radius="md"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            w={{ base: '100%', md: 350 }}
          >
            <Group justify="space-between" w={'100%'}>
              <UnstyledButton onClick={() => toggleComplete(task)}>
                <Group align="flex-start">
                  <Checkbox
                    checked={task.completed}
                    onChange={() => {}}
                    tabIndex={-1}
                    size="sm"
                    styles={{ input: { cursor: 'pointer' } }}
                    aria-hidden
                  />

                  <Text
                    fw={500}
                    lh={1}
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {task.name}
                  </Text>
                </Group>
              </UnstyledButton>

              <Anchor onClick={() => deleteTask(task._id)}>🗑️</Anchor>
            </Group>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
