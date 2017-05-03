module.exports = function(app) {
  const polls = require('./polls.js');

  app.post('/api/createpoll/', function(req, res) {
    var data = req.body;
    polls.createNewPoll(data);
    res.status(200).json({'success': true});
  });
};
