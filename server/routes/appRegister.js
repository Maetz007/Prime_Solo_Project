var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user');
var path = require('path');

router.post('/registerUser', function(req, res, next) {
    Users.create(req.body, function(err, post) {
         if(err) {
            res.redirect('/#/registerFail');
         } else {
            res.redirect('/#/main');
         } // end else
    }); // end Users.create
  console.log('New user registered');
}); // end /registerUser

module.exports = router;
