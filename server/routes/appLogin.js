var express = require('express');
var route = express.Router();
var passport = require('passport');
var path = require('path');

route.post('/userLogin',
    passport.authenticate('local', {
        successRedirect: '/main',
        failureRedirect: '/'
    }) // end passport.authenticate
); // end userLogin

module.exports = route;
