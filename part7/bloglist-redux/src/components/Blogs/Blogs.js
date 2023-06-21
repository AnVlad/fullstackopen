import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Blogs.module.css';

import Blog from './Blog';

function Blogs() {
  const blogs = useSelector((data) => data.blogs);

  return (
    <div>
      <h2>blogs</h2>

      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link
              className={style['blog-link-button']}
              to={`/blog/${blog.id}`}
              key={blog.id}>
              <Blog blog={blog} />
            </Link>
          ))}
    </div>
  );
}

export default Blogs;
