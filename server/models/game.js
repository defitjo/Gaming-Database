const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  genre: String,
  date: String,
  developerId: String,
});

module.exports = mongoose.model('Game', gameSchema);
