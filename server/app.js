var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var passport = require('./strategies/user-mongo.js');
var Player = require('./models/player.js'); // player schema

var loginRoute = require('./routes/appLogin');
var registerRoute = require('./routes/appRegister');
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
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
})); // end session

app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRoute, registerRoute, adminRoute, eventsRoute, mainRoute, playerRoute, roundRobinRoute);

app.get('/*', function(req,res){
  console.log('You Are in L');
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
}); // end app.get base URL
