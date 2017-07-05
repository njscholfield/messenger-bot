<template>
  <div>
    <navbar :page="$options.name"></navbar>
    <div class="jumbotron">
      <div class="container">
        <h1>Poll Results</h1>
      </div>
    </div>
    <div class="container">
      <div id="refresh">
        <button class="btn btn-primary" @click="getResults"><span class="glyphicon glyphicon-refresh"></span></button>
      </div>
      <alerts></alerts>
      <div id="results">
        <h3 class="text-info text-center" v-if="!results || results.length === 0">There are no polls to show :/ <em>Try <a href="/new-poll/">creating one</a>!</em></h3>
        <poll v-for="result in sortedResults" :key="result._id" :isLiveQ="isLiveQ(result)" :result="result" @refresh="getResults">
        </poll>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from '../navbar.vue';
  import alerts from '../alerts/alerts.vue';
  import poll from './poll.vue';

  module.exports = {
    name: 'results',
    components: {
      navbar, poll, alerts
    },
    data: function() {
      return {
        results: [],
        liveQuestionID: 0
      };
    },
    methods: {
      getResults() {
        fetch('/api/results/')
          .then(blob => blob.json())
          .then(data => {
            this.results = data.results;
            this.liveQuestionID = data.liveQuestionID;
            this.$emit('alert', {type: 'reset'});
          })
          .catch(() => this.$emit('alert', {type: 'error', message: 'Can\'t get poll results... Check your connection and try again!'}));
      },
      isLiveQ(result) {
        return result._id === this.liveQuestionID;
      }
    },
    computed: {
      sortedResults() {
        return this.results.sort((a, b) => (a._id > b._id) ? -1 : 1);
      }
    },
    mounted() {
      this.getResults();
    }
  }
</script>

<style>
  #refresh {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1em;
  }
</style>
