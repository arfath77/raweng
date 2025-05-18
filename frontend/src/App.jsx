import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Header } from './components/Header';
import { useState } from 'react';
import { getToken } from './utils';
import { Store } from './context';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <Router>
      <Store.Provider value={value}>
        <Layout />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Store.Provider>
    </Router>
  );
}

export default App;
