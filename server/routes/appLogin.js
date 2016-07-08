var express = require('express');
var passport = require('passport');
var path = require('path');
var route = express.Router(); // makes this page behave as a router

route.post('/userLogin',
  passport.authenticate('local', {
    successRedirect: '/views/pages/main.html',  // res.send(true)
    failureRedirect: '/views/pages/login.html'
  })
);
console.log('user has been redirected or logged in');

module.exports = route;
