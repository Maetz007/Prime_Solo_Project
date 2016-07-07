var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  name: String,
  class: String,
  level: Number,
  armor: String,
  shield: String
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
