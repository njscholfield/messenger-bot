module.exports = function(app) {
  const polls = require('./polls.js');

  app.get('/api/results/', function(req, res) {
    polls.getResults(req, res);
  });

  app.post('/api/createpoll/', function(req, res) {
    polls.createNewPoll(req, res);
  });

  app.post('/api/current/', function(req, res) {
    polls.changeCurrent(req, res);
  });
};
