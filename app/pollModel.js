var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, function(err) {
  if(err) {
    console.log('ERROR connecting to database: ' + err);
  } else {
    console.log('Successfully connected to database');
  }
});

var choiceSchema = mongoose.Schema({
  name: {type: String, required: true},
  numberOfVotes: {type: Number, default: 0}
});
var choice = mongoose.model('choice', choiceSchema);

var pollSchema = mongoose.Schema({
  category: {type: String, required: false},
  title: {type: String, required: true, index: {unique: true}},
  question: {type: String, required: true},
  numberOfVotes: {type: Number, default: 0, min: 0},
  choices: [choiceSchema]
});
var poll = mongoose.model('poll', pollSchema);

var currentSchema = mongoose.Schema({
  poll: {type: String, required: true, default: 0}
});
var current = mongoose.model('current', currentSchema);

//user sechema
var userSchema = mongoose.Schema({
  email: {type: String, index: { unique: true }},
  password: {type: String},
  username: {type: String, index: { unique: true }},
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var user = mongoose.model('user', userSchema);

module.exports = {
  poll, choice, current, user
};
