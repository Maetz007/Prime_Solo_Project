var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tournamentSchema = new Schema({
  name: String,
  tournament: [{}]
});

var Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
