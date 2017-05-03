/* global Vue: false */

var results = new Vue({
  el: '#results',
  data: {
    results: {}
  },
  methods: {
    getResults: fetchResults
  }
});

function fetchResults() {
  fetch('/api/results')
    .then(blob => blob.json())
    .then(data => results.results = data);
}
