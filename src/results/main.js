var Vue = require('vue');
require('whatwg-fetch');
var results = require('./results.vue');

new Vue({
  el: '#results',
  render: function(createElement) {
    return createElement(results);
  }
});
