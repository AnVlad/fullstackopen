import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../../services/blogs';
import { settingNotification } from '../../reduces/notificationReducer';
import { addBlog } from '../../reduces/blogsReducer';

function CreateNewBlogs({ setError }) {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((data) => data.user);

  const displayWhenTrue = { display: showForm ? '' : 'none' };
  const displayWhenFalse = { display: showForm ? 'none' : '' };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const newBlog = {
    title: title,
    author: author,
    url: url,
    comments: [{ content: 'hello' }],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setShowForm(!showForm);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

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

export default CreateNewBlogs;
