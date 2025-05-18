import '@mantine/core/styles.css';

import { Container, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { getToken, removeToken } from './utils';
import { useEffect } from 'react';
import API from './api';
import TaskList from './components/TaskList';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    if (isAuthenticated) {
      API.get('/tasks')
        .then(res => setTasks(res.data))
        .catch(() => setIsAuthenticated(false));
    }
  }, [isAuthenticated]);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <MantineProvider>
      <Container>
        {isAuthenticated ? (
          <>
            <button onClick={logout}>Logout</button>
            <h1>Your Tasks</h1>
            {/* <TaskForm onTaskAdded={task => setTasks(prev => [...prev, task])} /> */}
            <TaskList tasks={tasks} setTasks={setTasks} />
          </>
        ) : (
          <>
            <LoginForm onLogin={() => setIsAuthenticated(true)} />
            <RegisterForm />
          </>
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;
