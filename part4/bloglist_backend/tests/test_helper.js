const Blog = require('../models/blog');

// const initialBlogs = (user) => {
//   const init = [
//     {
//       title: 'Storac',
//       author: 'Stringson',
//       url: 'http:w23ldsa.com',
//       likes: 23,
//     },
//     {
//       title: 'How to make cats tidy up',
//       author: 'Einshten',
//       url: 'http:www.cats.com',
//       likes: 11233,
//     },
//   ];
//   return init;
// };

const initialBlogs = [
  {
    title: 'Storac',
    author: 'Stringson',
    url: 'http:w23ldsa.com',
    likes: 23,
  },
  {
    title: 'How to make cats tidy up',
    author: 'Einshten',
    url: 'http:www.cats.com',
    likes: 11233,
  },
];

const initialUser = {
  username: 'mean mouse',
  name: 'Aughust',
  password: 'mean_password',
  passwordHash: '$2b$10$IS/TIHOc4PyWOjqcmirIXu2eNEtb5KS98siuEVCpIHI/HioZ8vO.i',
  blogs: [],
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, initialUser, blogsInDb };
