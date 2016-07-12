var express = require('express');
var path = require('path');

var route = express.Router();

var Tournament = require('../models/tournament');

route.post('/tournamentAdd', function(req, res) {
  var newTournament = new Tournament({
    name: req.body.name,
    tournament: req.body.tournament
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

module.exports = route;
