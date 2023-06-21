const commentsRouter = require('express').Router();
const Comment = require('../models/comment');

commentsRouter.get('/', async (request, response) => {
  const blogId = request.get('blogId');

  const comments = await Comment.find({ blogId: blogId });
  response.json(comments);
});

commentsRouter.post('/', async (request, response) => {
  const body = request.body;

  const comment = new Comment({
    content: body.content,
    blogId: body.blogId,
  });

  const savedComment = await comment.save();
  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
