import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Container } from '@mui/material';

import blogService from './services/blogs';
import usersService from './services/users';
import { setBlogs } from './reduces/blogsReducer';
import { setAllUsers } from './reduces/allUsersReducer';
import { setUser } from './reduces/userReducer';
import Notification from './components/Notification';
import Blogs from './components/Blogs/Blogs';
import ErrorMessage from './components/ErrorMessage';
import Users from './components/User/Users';
import User from './components/User/User';
import BlogPage from './components/Blogs/BlogPage';
import AppBar from './AppBar/AppBar';
import CreateNewBlogs from './components/Blogs/CreateNewBlogs';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.user);

  const [error, setError] = useState(null);

  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await blogService.getAllBlogs();
      console.log('all blogs', response);

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
    <Container>
      <AppBar setUpdateList={setUpdateList} setError={setError} />
      {user.user && <CreateNewBlogs setError={setError} />}
      {<ErrorMessage error={error} setError={setError} />}
      {<Notification />}
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blog/:id' element={<BlogPage />} />
      </Routes>
    </Container>
  );
};

export default App;
