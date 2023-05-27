import React, { useState } from 'react';
import blogService from '../services/blogs';

function CreateNewBlogs({ setError, setNotification }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };

      const response = await blogService.createBlog(newBlog);
      setNotification(`a new blog ${title} by ${author} has been added`);
    } catch (error) {
      setError(error.message);
      console.log('error', error.message);
    }
  };

  return (
    <>
      <h1> Create new Blog </h1>
      <div>
        title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:{' '}
        <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit" onClick={handleClick}>
        Create
      </button>
    </>
  );
}

export default CreateNewBlogs;
