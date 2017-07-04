<template>
  <div :class="{'panel panel-success': isLiveQ}">
    <div class="panel-heading" v-if="isLiveQ">
      <h3 class="panel-title">Current Question</h3>
    </div>
    <div :class="{'panel-body': isLiveQ}">
      <h3 class="text-primary">{{ result.title }}</h3>
      <p>{{ result.question }}</p>
      <table class="table">
        <tbody>
          <tr>
            <th>Choice</th>
            <th>Votes</th>
            <th>Percentage</th>
          </tr>
          <tr v-for="choice in result.choices" :class="{info: (isGreatest(result, choice))}">
            <td>{{ choice.name }}</td>
            <td>{{ choice.numberOfVotes }}</td>
            <td>{{ choice.numberOfVotes / result.numberOfVotes | percentage(2) }}</td>
          </tr>
        </tbody>
      </table>
      <h6>TOTAL NUMBER OF VOTES: {{ result.numberOfVotes }}</h6>
      <div v-if="!isLiveQ">
        <button class="btn btn-success" @click="changeCurrent(result._id)">Make current question</button>
        <button class="btn btn-danger" @click="deleteQ(result._id)">Delete</button>
        <hr>
      </div>
    </div>

  </div>
</template>

<script>
  module.exports = {
    name: 'poll',
    props: ['isLiveQ', 'result'],
    methods: {
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
              this.$emit('refresh');
            } else { console.log(data.message); }
          })
          .catch(() => this.$parent.$emit('alert', {type: 'error', message: 'Can\'t change the current poll... Check your connection and try again!'}));
      },
      deleteQ(id) {
        var config = {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify({ id: id })
        };
        fetch('/api/deletepoll/', config)
          .then(blob => blob.json())
          .then(data => {
            if(data.success) {
              this.$emit('refresh');
            } else { console.log(data.message); }
          })
          .catch(() => this.$parent.$emit('alert', {type: 'error', message: 'Can\'t delete the poll... Check your connection and try again!'}));
      },
      isGreatest(result, choice) {
        var votes = result.choices.map(item => item.numberOfVotes);
        return choice.numberOfVotes > 0 && Math.max.apply(null, votes) === choice.numberOfVotes;
      }
    },
    filters: {
      percentage: function(value, decimals) {
        if(!value) value = 0;
        if(!decimals) decimals = 0;

        value = value * 100;
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
      }
    }
  };
</script>

<style>
  .show-tooltip {
    display: block;
    position: relative;
  }
</style>
