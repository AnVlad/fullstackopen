import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import commentsService from '../../services/comments';
import { settingNotification } from '../../reduces/notificationReducer';
import { deleteBlog, updateBlog } from '../../reduces/blogsReducer';
import blogService from '../../services/blogs';
import Button from '../Button';
import CreateComment from '../Comments/CreateComment';
import Comments from '../Comments/Comments';

import style from './BlogPage.module.css';

function BlogPage() {
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  const id = useParams().id;

  const navigate = useNavigate();

  const blog = useSelector((data) => data.blogs.find((blog) => blog.id === id));
  const userId = useSelector((data) => data.user.id);

  useEffect(() => {
    const as = async () => {
      const comments = await commentsService.getComments(id);
      setComments(comments);
      console.log('comments', comments);
    };
    as();
  }, []);

  const handleUpdateLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,

      // because user stored in database as id and only then modified by mongoose by "populate" method
      // so there need to pass only id
      user: blog.user.id,
    };

    dispatch(settingNotification(`you has voted for ${blog.title}`, 2000));

    const newUpdatedBlog = await blogService.updateBlog(updatedBlog, blog.id);

    dispatch(updateBlog(newUpdatedBlog));
  };

  const handleDeleting = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return;

    await blogService.deleteBlog(blog.id);

    dispatch(deleteBlog(blog.id));
    navigate('/');
  };

  if (!blog) return null;
  return (
    <div>
      <h1>
        {blog.title}, {blog.author}
      </h1>
      <p>
        find out more by link{' '}
        <a
          className={style.link}
          href={blog.url}
          target='_blank'
          rel='noopener noreferrer'>
          {blog.url}
        </a>
      </p>

      <p>
        {blog.likes} likes{' '}
        <Button
          className={style['like-button']}
          onClickFunction={() => handleUpdateLikes(blog)}>
          like
        </Button>
      </p>
      {userId === blog.user.id ? (
        <Button
          className={'delete-button'}
          onClickFunction={() => handleDeleting(blog)}
          type='button'>
          delete
        </Button>
      ) : (
        <></>
      )}
      <p>added by {blog.user.name}</p>

      <CreateComment blogId={id} setComments={setComments} />
      <Comments comments={comments} />
    </div>
  );
}

export default BlogPage;
