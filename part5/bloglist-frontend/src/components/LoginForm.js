import React, { useState } from 'react';
import blogService from '../services/blogs';

function LoginForm({ setUpdateList, setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const response = await blogService.login({
        username: username,
        password: password,
      });

      console.log(response);
      setUsername('');
      setPassword('');

      window.localStorage.setItem('loggedUser', JSON.stringify(response));

      setUpdateList((prevState) => !prevState);
    } catch (exception) {
      setError('wrong username or password');
    }
  };

  return (
    <>
      <div>
        username:
        <input
          id='username-input'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          id='password-input'
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='logIn' type='submit' onClick={handleLogIn}>
        Log in
      </button>
    </>
  );
}

export default LoginForm;
