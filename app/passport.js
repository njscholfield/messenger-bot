var localStrategy = require('passport-local').Strategy;

var User = require('../app/pollModel.js').user;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new localStrategy({
    usernameField: 'inputUsername',
    passwordField: 'newPassword1',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    var data = req.body;

    if(password !== data.newPassword2 || password.length > 72 || password.length < 8) {
      return done(null, false, req.flash('signupMessage', 'Passwords do not match or are not 8-72 characters'));
    }
    var newUser = new User();
    User.findOne({$or: [{'email': data.inputEmail}, {username: username}]}, function(err, user) {
      if(err){
        return done(err);
      }

      if(user) {
        if(user.username === username) {
          return done(null, false, req.flash('signupMessage', 'That username has already been taken.'));
        }
        return done(null, false, req.flash('signupMessage', 'That email address is already taken.'));
      } else {
        newUser.email = data.inputEmail;
        newUser.username = username;
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if(err) {
            console.log('Error creating new account: ' + err);
            return done(err);
          }
          return done(null, newUser);
        });
      }
    });
  }
  ));

  passport.use('local-login', new localStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, req.flash('loginMessage', 'User not found.'));
      }
      if(!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect Password!'));
      }

      return done(null, user);
    });
  }
  ));

};
