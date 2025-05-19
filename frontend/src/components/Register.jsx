import { useState } from 'react';
import API from '../api';
import { Form } from './Form';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await API.post('/register', { email, password, name });
      alert('Registered! You can now log in.');
    } catch (err) {
      console.log(err);
      alert('Registration failed');
    }
  };

  return (
    <Form
      formType={'register'}
      handleSubmit={handleRegister}
      fields={[
        {
          name: 'name',
          value: name,
          setValue: setName,
          type: 'text',
          placeholder: 'Name',
        },
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
