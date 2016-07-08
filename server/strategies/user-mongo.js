var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var encryptLib = require('../modules/encryption');

passport.serializeUser(function(user, done) {
  console.log('serialized: ', user);
  done(null, user.id);
}); // end passport.serialization

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      done(err);
    } // end if

    console.log('deserialized: ', user);
    done(null, user);
  }); // end findById
}); // end passport.deserialization

passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    // mongoose stuff
    User.findOne({username: username}, function(err, user) {
      if(err) {
        throw err;
      } // end if

      if(!user) {
        // user not found
        return done(null, false, {message: 'No user by that name exists'});
      } else {
        // found user! Now check their given password against the one stored in the DB
        user.comparePassword(password, function(err, isMatch) {
          if(err) {
            throw err;
          } // end it

          if(isMatch) {
            // all good, populate user object on the session through serializeUser
            return(done(null, user));
          } else {
            // no good.
            done(null, false, {message: 'Wrong password'});
          } // end else
        }); // end comparePassword
       } // end else
    }); // end findOne
  } // end callback
)); // end passport.use

module.exports = passport;
