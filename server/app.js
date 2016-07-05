var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Player = require('./models/player.js');

app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

app.use(express.static('server/public'));

var mongodbUri = 'mongodb://tarrasquebeast:poopoo12@ds021994.mlab.com:21994/amtgard_eventum';
mongoose.connect(mongodbUri);

app.use(bodyParser.json());

app.get('/getPlayers', function(req, res){
  Player.find().then(function(data){
  res.send(data);
  }); // end Player.find
}); //end getPlayers

app.post('/playerAdd', function(req, res) {
  var newPlayer = new Player({
    name: req.body.name,
    class: req.body.class,
    level: req.body.level
  }); // end newPlayer object
  newPlayer.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('player has been added to database');
      res.sendStatus(200);
    } // end else
  }); // end newPlayer.save
});//end "addPlayer" route

app.post('/playerRemove', function(req, res){
  var playerId = req.body.id;
  Player.findOne({_id: playerId}, function(err, Player) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      Player.remove({_id: playerId}, function(err) {});
      console.log('Player has been removed');
      res.sendStatus(200);
    } // end else
  }); // Player.findOne
});// end post playerRemove

app.get('/*', function(req,res){
  console.log('You Are in L');
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
}); // end app.get base URL
