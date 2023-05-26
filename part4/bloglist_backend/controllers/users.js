const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });

  response.json(allUsers);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password, blogs } = request.body;

  if (password && password.length < 3) {
    response.status(400).send({ error: 'length of password must be at least 3 chars' }).end();
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      blogs,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
