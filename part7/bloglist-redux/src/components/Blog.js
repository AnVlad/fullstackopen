import { useState } from 'react';
import Button from './Button';
import { settingNotification } from '../reduces/notificationReducer';
import { useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reduces/blogsReducer';
import blogService from '../services/blogs';
import { useSelector } from 'react-redux';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const userId = useSelector((data) => data.user.id);

  const [showDetails, setShowDetails] = useState(false);
  const displayDetails = { display: showDetails ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
  };

  return (
    <div className='blog' style={blogStyle}>
      <span>{blog.title}</span> {blog.author}{' '}
      <Button
        className={'show-details-button'}
        onClickfunction={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'show'}
      </Button>
      <div className='details' style={displayDetails}>
        <div>
          <a href='/'>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{' '}
          <Button
            className={'like-button'}
            onClickfunction={() => handleUpdateLikes(blog)}>
            like
          </Button>
        </div>
        <div>{blog.user.name}</div>
        {userId === blog.user.id ? (
          <Button
            className={'delete-button'}
            onClickfunction={() => handleDeleting(blog)}
            type='button'>
            delete
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Blog;
