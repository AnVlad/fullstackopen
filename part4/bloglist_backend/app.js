const { mongoUrl } = require('./utils/config');

const express = require('express');
require('express-async-errors');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const userLogin = require('./controllers/login');
const testingRouter = require('./controllers/testing');
const commentsRouter = require('./controllers/comments');

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] :response-time :data')
);

mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);

app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', userLogin);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
