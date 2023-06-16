import { useState } from 'react';
import Button from './Button';

const Blog = ({ userId, blog, handleUpdateLikes, handleDeleting }) => {
  const [showDetails, setShowDetails] = useState(false);
  const displayDetails = { display: showDetails ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  console.log('blog.user.id', blog.user.id, '=== userId', userId);
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
