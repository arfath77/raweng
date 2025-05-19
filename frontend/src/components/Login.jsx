import { useState } from 'react';
import API from '../api';
import { saveToken } from '../utils';
import { Form } from './Form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../context';

export const Login = () => {
  const { isAuthenticated } = useContext(Store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      saveToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Login failed: ' + err.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Form
      formType={'login'}
      handleSubmit={handleLogin}
      fields={[
        {
          name: 'email',
          value: email,
          setValue: setEmail,
          type: 'email',
          placeholder: 'Email',
        },
        {
          name: 'password',
          value: password,
          setValue: setPassword,
          type: 'password',
          placeholder: 'Password',
        },
      ]}
    />
  );
};
