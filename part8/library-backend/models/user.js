const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  favoriteGenre: String,
});

const User = mongoose.model('User', schema);

module.exports = User;
