import React from 'react';
import blogService from '../services/blogs';
import LogoutForm from './LogoutForm';
import CreateNewBlogs from './CreateNewBlogs';

const LoggedField = ({
  setNotification,
  setError,
  setBlogs,
  blogs,
  user,
  setUser,
}) => {
  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.createBlog(newBlog);
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} has been added`
      );
      setBlogs([
        ...blogs,
        {
          ...response,
          user: { name: user.user, username: user.username, id: user.id },
        },
      ]);
      console.log(response);
    } catch (error) {
      setError(error.message);
      console.log('error', error.message);
    }
  };

  return (
    <>
      <LogoutForm user={user} setUser={setUser} />
      <CreateNewBlogs createBlog={createBlog} />
    </>
  );
};

export default LoggedField;
