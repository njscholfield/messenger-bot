var Vue = require('vue');
require('whatwg-fetch');
var home = require('./home.vue');

new Vue({
  el: '#home',
  render: function(createElement) {
    return createElement(home);
  }
});
