import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import ErrorMessage from './components/ErrorMessage';
import Notification from './components/Notification';
import LoggedField from './components/LoggedField';

import { useSelector } from 'react-redux';
import { setBlogs } from './reduces/blogsReducer';
import { setUser } from './reduces/userReducer';
import usersService from './services/users';
import { setAllUsers } from './reduces/allUsersReducer';
import Users from './components/Users';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((data) => data.user);
  const allUsers = useSelector((data) => data.allUsers);
  console.log('allUsers', allUsers);

  const [error, setError] = useState(null);

  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await blogService.getAllBlogs();

      dispatch(setBlogs(response));
    }
    fetchBlogs();

    async function fetchUsers() {
      const response = await usersService.getAllUsers();

      dispatch(setAllUsers(response));
    }
    fetchUsers();

    setUpdateList(!updateList);
  }, []);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    console.log(loggedUser);

    if (loggedUser) {
      dispatch(
        setUser({
          user: loggedUser.name,
          username: loggedUser.username,
          id: loggedUser.userid,
        })
      );
      blogService.setToken(loggedUser.token);
    }
  }, [updateList]);

  return (
    <div>
      {!user.user ? (
        <LoginForm setUpdateList={setUpdateList} setError={setError} />
      ) : (
        <LoggedField setError={setError} />
      )}

      {<ErrorMessage error={error} setError={setError} />}
      {<Notification />}

      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
