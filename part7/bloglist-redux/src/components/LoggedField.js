import React from 'react';
import blogService from '../services/blogs';
import LogoutForm from './LogoutForm';
import CreateNewBlogs from './CreateNewBlogs';
import { useDispatch } from 'react-redux';
import { settingNotification } from '../reduces/notificationReducer';
import { addBlog } from '../reduces/blogsReducer';
import { useSelector } from 'react-redux';

const LoggedField = ({ setError }) => {
  const dispatch = useDispatch();

  const user = useSelector((data) => data.user);

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.createBlog(newBlog);

      dispatch(
        settingNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
          2000
        )
      );

      dispatch(
        addBlog({
          ...response,
          user: { name: user.user, username: user.username, id: user.id },
        })
      );
      console.log(response);
    } catch (error) {
      setError(error.message);
      console.log('error', error.message);
    }
  };

  return (
    <>
      <LogoutForm />
      <CreateNewBlogs createBlog={createBlog} />
    </>
  );
};

export default LoggedField;
