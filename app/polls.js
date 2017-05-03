var models = require('./pollModel.js');
var current = models.current;
var poll = models.poll;
var choice = models.choice;

exports.createNewPoll = function(formData) {
  getChoices(formData.choices)
    .then(function(choices) {
      var newPoll = new poll({
        category: formData.category,
        title: formData.title,
        question: formData.question,
        choices: choices
      });

      newPoll.save(function(err, product) {
        if(err) console.log(err);
        else if(formData.isCurrentQuestion) {
          current.findOneAndUpdate({}, {$set: {poll: product._id}}, {new: true}, function(err) {
            if(err) console.log(err);
          });
        }
      });
    });
};

var getChoices = function(choices) {
  return new Promise(function(resolve) {
    var results = [];
    choices.forEach(function(choiceInfo) {
      var newChoice = new choice({
        name: choiceInfo.name
      });
      results.push(newChoice);
    });
    resolve(results);
  });
};

exports.getCurrentPoll = function() {
  return new Promise(function(resolve, reject) {
    current.findOne({}, function(err, result) {
      if(err || !result) {
        reject(err + ' or no current poll saved');
      } else {
        var id = result.poll;
        poll.findOne({_id: id}, function(err, result) {
          if(err || !result) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};

exports.recordVote = function(voteData) {
  poll.findOneAndUpdate({title: voteData.title, 'choices.name': voteData.choice}, {$inc: {'choices.$.numberOfVotes': 1, numberOfVotes: 1 }}, {new: true}, function(err) {
    if(err) console.log('Error counting vote: ' + err);
  });
};


exports.getResults = function(req, res) {
  poll.find({}, function(err, results) {
    if(err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'err'});
    } else {
      current.findOne({}, function(err, result) {
        if(err) {
          console.log(err);
          return res.status(500).json({ success: false, message: 'err'});
        } else {
          return res.status(200).json({results: results, liveQuestionID: result.poll});
        }
      });
    }
  });
};
