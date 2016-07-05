var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Player = require('./models/player.js');

var adminRoute = require('./routes/appAdmin');
var eventsRoute = require('./routes/appEvents');
var mainRoute = require('./routes/appMain');
var playerRoute = require('./routes/appPlayer');
var roundRobinRoute = require('./routes/appRoundRobin');

app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

app.use(express.static('server/public'));

var mongodbUri = 'mongodb://tarrasquebeast:poopoo12@ds021994.mlab.com:21994/amtgard_eventum';
mongoose.connect(mongodbUri);

app.use(bodyParser.json());

app.use('/', adminRoute);
app.use('/', eventsRoute);
app.use('/', mainRoute);
app.use('/', playerRoute);
app.use('/', roundRobinRoute);

app.get('/*', function(req,res){
  console.log('You Are in L');
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
}); // end app.get base URL
