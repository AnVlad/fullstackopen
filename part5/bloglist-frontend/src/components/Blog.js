import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const displayDetails = { display: showDetails ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdateLikes = async () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,

      // because user stored in database as id and modified by mongoose by "populate" method
      user: blog.user.id,
    };

    const newUpdatedBlog = await blogService.updateBlog(updatedBlog, blog.id);

    const newListOfBlogs = blogs.map((blog) =>
      blog.id === newUpdatedBlog.id ? newUpdatedBlog : blog,
    );
    setBlogs(newListOfBlogs);
  };

  const handleDeleting = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return;

    await blogService.deleteBlog(blog.id);

    const newListOfBlogs = blogs.filter((blogFromList) => {
      return blogFromList.id !== blog.id;
    });
    setBlogs(newListOfBlogs);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      <div style={displayDetails}>
        <div>
          <a href="/">{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} <button onClick={handleUpdateLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button type="button" onClick={() => handleDeleting()}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
