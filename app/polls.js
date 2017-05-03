var models = require('./pollModel.js');
var current = models.current;
var poll = models.poll;
var choice = models.choice;

current.findOne({}, function(err, result) {
  if(!result) {
    var newCurrent = new current({});
    newCurrent.save();
  }
});

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
  current.findOne({}, function(err, result) {
    if(err) console.log(err);
    else if(!result) {
      return null;
    } else {
      var id = result.poll;
      poll.findOne({_id: id}, function(err, result) {
        if(err || !result) {
          console.log(err);
          return null;
        } else {
          return result;
        }
      });
    }
  });
};
