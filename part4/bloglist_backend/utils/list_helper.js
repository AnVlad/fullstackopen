const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => blog.likes + acc, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return [];

  let mostLikes = blogs[0];

  blogs.forEach((blog) => (blog.likes > mostLikes.likes ? (mostLikes = blog) : ''));
  return mostLikes;
};

const mostBlogs = (blogs) => {
  const authors = [];

  blogs.forEach((blog) => {
    if (authors.length === 0) {
      authors.push({ author: blog.author, blogs: 1 });
    } else {
      authors.find((obj) => obj.author === blog.author)
        ? (function () {
            const index = authors.findIndex((obj) => obj.author === blog.author);
            authors[index] = {
              author: blog.author,
              blogs: authors[index].blogs + 1,
            };
          })()
        : authors.push({ author: blog.author, blogs: 1 });
    }
  });

  return authors.reduce((previous, current) =>
    previous.blogs > current.blogs ? previous : current,
  );
};

const mostLikes = (blogs) => {
  const authors = [];

  blogs.forEach((blog) => {
    if (authors.length === 0) {
      authors.push({ author: blog.author, likes: blog.likes });
    } else {
      authors.find((obj) => obj.author === blog.author)
        ? (function () {
            const index = authors.findIndex((obj) => obj.author === blog.author);
            authors[index] = {
              author: blog.author,
              likes: authors[index].likes + blog.likes,
            };
          })()
        : authors.push({ author: blog.author, likes: blog.likes });
    }
  });

  return authors.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
