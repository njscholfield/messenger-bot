var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, function(err) {
  if(err) {
    console.log('ERROR connecting. ' + err);
  } else {
    console.log ('Succeeded, connected');
  }
});

var resultsSchema = mongoose.Schema({
  type: {type: String, required: true},
  title: {type: String, required: true},
  question: {type: String, required: true},
  results: [{
      choice: {type: String, required: false},
      votes: {type: Number, required: false}
  }]
});
var results = mongoose.model('results', resultsSchema);

module.exports = results;
