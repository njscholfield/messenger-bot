var Vue = require('vue');
require('whatwg-fetch');
var newPoll = require('./newPoll.vue');

new Vue({
  el: '#new-poll',
  render: function(createElement) {
    return createElement(newPoll);
  }
});
