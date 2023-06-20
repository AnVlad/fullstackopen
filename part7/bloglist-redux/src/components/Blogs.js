import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

function Blogs() {
  const blogs = useSelector((data) => data.blogs);

  return (
    <div>
      <h2>blogs</h2>

      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
}

export default Blogs;
