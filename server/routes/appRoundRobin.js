var express = require('express');
var path = require('path');

var route = express.Router();

var Tournament = require('../models/tournament');

route.post('/tournamentAdd', function(req, res) {
  var newTournament = new Tournament({
    name: req.body.name,
    tournament: req.body.tournament,
    results: req.body.results
  }); // end newPlayer object
  newTournament.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('tournament has been added to database');
      res.sendStatus(200);
    } // end else
  }); // end newPlayer.save
});//end "addPlayer" route

route.get('/getTournament', function(req, res) {
    Tournament.find().then(function(data){
    res.send(data);
  }); // end Tournament.find
}); // end getTournament

route.post('/deleteTournament', function(req, res){
  var tournamentId = req.body.id;
  Tournament.findOne({_id: tournamentId}, function(err, Tournament) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      Tournament.remove({_id: tournamentId}, function(err) {});
      console.log('Removed player');
      res.sendStatus(200);
    } // end else
  }); // Player.findOne
});// end post playerRemove

module.exports = route;
