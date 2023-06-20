const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  });
  response.json(allBlogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = request.user;

  if (!request.body.url) {
    return response.status(400).end();
  }
  if (!user) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedFile = await blog.save();
  user.blogs = [...user.blogs, savedFile];
  await user.save();

  response.status(201).json(savedFile);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const blog = await Blog.findById(request.params.id);

  if (user._id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: 'you are not the author of the post' });
  }

  user.blogs = [
    ...user.blogs.filter((blog) => blog.id.toString() !== request.params.id),
  ];
  await user.save();
  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = { ...body };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
