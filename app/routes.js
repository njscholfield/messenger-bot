module.exports = function(app) {
  const polls = require('./polls.js');

  app.post('/api/createpoll/', function(req, res) {
    var data = req.body;
    console.log(data);
    polls.createNewPoll(data);
    res.status(200).json({'success': true});
  });
};
