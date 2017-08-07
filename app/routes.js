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

  app.options('/api/mailchimp/', function(req, res) {
    res.header('Access-Control-Allow-Origin', 'https://secularpitt.club');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });

  app.post('/api/mailchimp/', function(req, res) {
    res.header('Access-Control-Allow-Origin', 'https://secularpitt.club');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var newSubscriber = req.body;
    request.post('https://us15.api.mailchimp.com/3.0/lists/45f7988056/members/', {
      auth: {
        'user': 'username',
        'pass': process.env.MAILCHIMP_KEY
      },
      json: newSubscriber
    }, function (error, response, body) {
      if(!error && body.status == 'subscribed' && body.email_address) {
        res.json({success: true, message: `${body.email_address} was subscribed!`});
      } else if(body.status === 400 && body.title === 'Member Exists') {
        res.json({success: false, message: `Looks like ${newSubscriber.email_address} is already subscribed.`});
      } else {
        res.json({success: false, message: 'Sorry, that didn\'t work. Can you try again?'});
      }
    });
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
