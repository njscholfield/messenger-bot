/* eslint no-unused-vars: 0 */
/* global Vue: false */

var results = new Vue({
  el: '#results',
  data: {
    results: [],
    liveQuestionID: 0
  },
  methods: {
    getResults() {
      fetch('/api/results/')
        .then(blob => blob.json())
        .then(data => {
          this.results = data.results;
          this.liveQuestionID = data.liveQuestionID;
        })
        .catch(err => console.log(err));
    },
    changeCurrent(id) {
      var config = {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({type: 'poll', id: id})
      };
      fetch('/api/current/', config)
        .then(blob => blob.json())
        .then(data => {
          if(data.success) {
            this.liveQuestionID = data.id;
          } else { console.log(data.message); }
        })
        .catch(err => console.log(err));
    },
    isLiveQ(result) {
      return result._id === this.liveQuestionID;
    },
    isGreatest(result, choice) {
      var votes = result.choices.map(item => item.numberOfVotes);
      return choice.numberOfVotes > 0 && Math.max.apply(null, votes) === choice.numberOfVotes;
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
