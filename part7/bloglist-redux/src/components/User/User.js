import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User() {
  const id = useParams().id;

  const user = useSelector((data) => data.allUsers).find(
    (user) => user.id === id
  );

  if (!user) return null;

  return (
    <>
      <h2>{user.name}</h2>
      <p>added blogs: </p>
      {user.blogs.map((blog) => {
        return <li key={blog.id}>{blog.title}</li>;
      })}
    </>
  );
}

export default User;
