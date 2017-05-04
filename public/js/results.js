/* global Vue: false */

var results = new Vue({
  el: '#results',
  data: {
    results: [],
    liveQuestionID: 0
  },
  methods: {
    getResults() {
      fetch('/api/results')
        .then(blob => blob.json())
        .then(data => {
          this.results = data.results;
          this.liveQuestionID = data.liveQuestionID;
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    sortedResults() {
      return this.results.sort((a, b) => (a._id > b._id) ? -1 : 1);
    }
  },
  mounted() {
    this.getResults();
  },
  filters: {
    percentage: function(value, decimals) {
      if(!value) value = 0;
      if(!decimals) decimals = 0;

      value = value * 100;
      return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
    }
  }
});
