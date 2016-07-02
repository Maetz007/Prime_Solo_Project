var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// turns server on
app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

// creates static folder
app.use(express.static('server/public'));

// base URL
app.get("/*", function(req,res){
  console.log("You Are in L");
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file));
}); // end app.get

// parses all information passed into server into a json file structure
app.use(bodyParser.json());
