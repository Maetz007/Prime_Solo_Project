var express = require('express');
var path = require('path');

var route = express.Router();

var Player = require('../models/player');

route.get('/getPlayers', function(req, res){
  Player.find().then(function(data){
  res.send(data);
  }); // end Player.find
}); //end getPlayers

route.post('/playerAdd', function(req, res) {
  var newPlayer = new Player({
    name: req.body.name,
    class: req.body.class,
    level: req.body.level,
    armor: req.body. armor,
    shield: req.body.shield
  }); // end newPlayer object
  newPlayer.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('player has been added to database');
      res.send(true);
    } // end else
  }); // end newPlayer.save
});//end "addPlayer" route

route.post('/playerRemove', function(req, res){
  var playerId = req.body.id;
  Player.findOne({_id: playerId}, function(err, Player) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      Player.remove({_id: playerId}, function(err) {});
      console.log('Removed player');
      res.sendStatus(200);
    } // end else
  }); // Player.findOne
});// end post playerRemove

route.post('/playerUpdate', function(req, res){
    var playerId = req.body.id;
    Player.findOne({_id: playerId}, function(err, Player) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      } else {
        Player.update({name: req.body.name, class: req.body.class, level: req.body.level,
          armor: req.body.armor, shield: req.body.shield}, function(err) {});
          console.log('Player has been updated');
        res.send(true);
      } // end else
    }); // Player.findOne
}); // end put playerUpdate

module.exports = route;
