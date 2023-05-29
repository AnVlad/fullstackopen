import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

function CreateNewBlogs({ setError, setNotification, blogs, setBlogs, user }) {
  const [showForm, setShowForm] = useState(false);

  const displayWhenTrue = { display: showForm ? '' : 'none' };
  const displayWhenFalse = { display: showForm ? 'none' : '' };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };

      const response = await blogService.createBlog(newBlog);
      setNotification(`a new blog ${title} by ${author} has been added`);
      setBlogs([...blogs, { ...response, user: { name: user } }]);
      console.log(response);
    } catch (error) {
      setError(error.message);
      console.log('error', error.message);
    }
  };

  return (
    <>
      <div style={displayWhenFalse}>
        <br />
        <button onClick={() => setShowForm(!showForm)}>Create New Blog</button>
      </div>

      <form style={displayWhenTrue} onSubmit={handleSubmit}>
        <h1> Create new Blog </h1>
        <div>
          title:{' '}
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:{' '}
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">Create</button>{' '}
        <button type="button" onClick={() => setShowForm(!showForm)}>
          Cancel
        </button>
      </form>
    </>
  );
}

CreateNewBlogs.propTypes = {
  setError: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default CreateNewBlogs;
