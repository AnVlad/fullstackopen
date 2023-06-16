import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CreateNewBlogs({ createBlog }) {
  const [showForm, setShowForm] = useState(false);

  const displayWhenTrue = { display: showForm ? '' : 'none' };
  const displayWhenFalse = { display: showForm ? 'none' : '' };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const newBlog = {
    title: title,
    author: author,
    url: url,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setShowForm(!showForm);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <div style={displayWhenFalse}>
        <br />
        <button
          className='create-blog-button'
          onClick={() => setShowForm(!showForm)}>
          Create New Blog
        </button>
      </div>

      <form
        style={displayWhenTrue}
        onSubmit={(event) => handleSubmit(event, newBlog)}>
        <h1> Create new Blog </h1>
        <div>
          title:{' '}
          <input
            className='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            className='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            className='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className='submit-button' type='submit'>
          Create
        </button>{' '}
        <button type='button' onClick={() => setShowForm(!showForm)}>
          Cancel
        </button>
      </form>
    </>
  );
}

CreateNewBlogs.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateNewBlogs;
