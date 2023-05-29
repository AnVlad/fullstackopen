import React, { useState } from 'react';
import blogService from '../services/blogs';

function LoginForm({ setUser, setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const response = await blogService.login({ username: username, password: password });
      console.log(response);
      setUser(response.name);
      setUsername('');
      setPassword('');

      window.localStorage.setItem('loggedUser', JSON.stringify(response));
    } catch (exception) {
      setError('wrong username or password');
    }
  };

  return (
    <>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogIn}>
        Log in
      </button>
    </>
  );
}

export default LoginForm;
