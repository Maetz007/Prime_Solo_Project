var express = require('express');
var path = require('path');
var route = express.Router();
// var encryptLib = require('../modules/encryption');
var User = require('../models/user');

route.post('/registerUser', function(req, res) {

  var newUser = new User({
    username: req.body.username,
    password: req.body.password  // encryptLib.encryptPassword(req.body.password)
  }); // end newPlayer object

  newUser.save(function(err) {
    if(err){
      // console.log(err);
      console.log("username already exists");
      res.sendStatus(500);
    }else {
      console.log('user has been created');
      res.redirect('/');
    } // end else
  }); // end newUser.save

}); // end registerUser

module.exports = route;
