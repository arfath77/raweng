import { useState } from 'react';
import API from '../api';
import { saveToken } from '../utils';
import { Form } from './Form';
import { redirect } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      saveToken(res.data.token);
      redirect('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Login failed: ' + err.message);
    }
  };

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
