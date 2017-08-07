module.exports = function(app, passport) {
  const polls = require('./polls.js');
  const request = require('request');

  app.get('/api/results/', function(req, res) {
    polls.getResults(req, res);
  });

  app.post('/api/createpoll/', function(req, res) {
    polls.createNewPoll(req, res);
  });

  app.post('/api/deletepoll/', function(req, res) {
    polls.deletePoll(req, res);
  });

  app.post('/api/current/', function(req, res) {
    polls.changeCurrent(req, res);
  });

  app.get('/register/', function(req, res) {
    if(req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('register', {message: {type: 'text-danger', content: req.flash('signupMessage')}, user: {hide:true}, hash: req.query.hash });
    }
  });

  app.post('/register/', passport.authenticate('local-signup', {
    failureRedirect: '/register/',
    failureFlash: true
  }), function(req, res) {
    res.redirect('/');
  });

  app.get('/login/', function(req, res) {
    if(req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('login', {message: req.flash('loginMessage'), error: {}, user: {hide:true}, hash: req.query.hash });
    }
  });

  app.post('/login/', passport.authenticate('local-login', {
    failureRedirect: '/login/',
    failureFlash: true
  }), function(req, res) {
    if(req.body.remember_me) {
      req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000; /* 10 days */
    }
    res.redirect('/');
  });

  app.get('/auth/verify', function(req, res) {
    if(req.isAuthenticated()) {
      res.status(200).json({loggedIn: true, username: req.user.username});
    } else {
      res.status(200).json({loggedIn: false});
    }
  });

  app.get('/logout/', function(req, res){
    req.logout();
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      }
      res.redirect('/');
    });
    res.clearCookie('sessionID');
  });
};
