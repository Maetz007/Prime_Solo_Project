var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Store this user's unique id in the session for later reference
// Only runs during authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Runs on every request after user is authenticated
// Look up the user's id in the session and use it to find them in the DB for each request
// result is stored on req.user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) { done(err); }
    done(null, user);
  }); // end User.findById
}); // end passport.deserializeUser

// Does actual work of logging in
// Called by middleware stack
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    // mongoose stuff
    User.findOne({username: username}, function(err, user) {
      if(err) { throw err; }

      if(!user) {
        // user not found
        return done(null, false, {message: 'Username does not exist'});
      } else {
        // found user! Now check their given password against the one stored in the DB
        user.comparePassword(password, function(err, isMatch) {
          if(err) { throw err; }

          if(isMatch) {
            // all good, populate user object on the session through serializeUser
            return(done(null, user));
          } else {
            // no good.
            done(null, false, {message: 'Wrong password'});
          } // end else line 43
        }); // end user.comparePassword
      } // end else line 35
    }); // end User.findOne
  } // end callback function line 27
)); // end passport.use

module.exports = passport;
