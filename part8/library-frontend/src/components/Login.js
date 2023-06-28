import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const receivedToken = result.data.login.value;
      setToken(receivedToken);
      localStorage.setItem('user-token', receivedToken);
    }
  }, [result.data]); //eslint-disable-line

  const handleSubmit = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='123'>username</label>
        <input
          type='text'
          id='123'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>submit</button>
    </form>
  );
}

export default Login;
