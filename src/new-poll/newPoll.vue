<template>
  <div>
    <navbar :page="$options.name"></navbar>
    <div class="jumbotron">
      <div class="container">
        <h1>Create a new poll</h1>
      </div>
    </div>
    <div class="container">
      <alerts></alerts>
      <form @submit.prevent="submit">
        <fieldset>
          <div class="form-group">
            <label for="">Category</label>
            <select name="category" class="form-control" v-model="formData.category">
              <option value="meeting_topic">Meeting Topic</option>
            </select>
          </div>
          <form-field :error="errors.includes('title')" v-model="formData.title" label="Title" placeholder="9/1/17 Meeting"></form-field>
          <form-field v-model="formData.question" label="Question" placeholder="What should our next meeting topic be?"></form-field>
          <div class="row">
            <form-field class="col-sm-4" v-model="formData.choices[0].name" label="Choice 1" placeholder="bananas"></form-field>
            <form-field class="col-sm-4" v-model="formData.choices[1].name" label="Choice 2" placeholder="tacos"></form-field>
            <form-field class="col-sm-4" v-model="formData.choices[2].name" label="Choice 3" placeholder="noodles"></form-field>
          </div>
          <toggle-switch label="Make this the current question:" v-model="formData.isCurrentQuestion"></toggle-switch>
        </fieldset>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">Create Poll</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import navbar from '../navbar.vue';
  import alerts from '../alerts/alerts.vue';
  import toggleSwitch from './toggleSwitch.vue';
  import formField from './formField.vue';

  export default {
    name: 'new-poll',
    components: {
      navbar, alerts, toggleSwitch, formField
    },
    data() {
      return {
        formData: {
          category: 'meeting_topic',
          isCurrentQuestion: true,
          choices: [ {name: ''}, {name: ''}, {name: ''} ]
        },
        errors: []
      };
    },
    methods: {
      submit() {
        var config = {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(this.formData)
        };
        fetch('/api/createpoll/', config)
          .then(blob => blob.json())
          .then(data => {
            if(data.success) {
              this.resetForm(true);
              this.$emit('alert', {type: 'success', message: 'Poll successfully submitted!'});
            } else {
              this.resetForm(false);
              this.$emit('alert', {type: 'error', message: data.message});
              this.errors = data.fields;
            }
          }).catch(() => this.$emit('alert', {type: 'error', message: 'That didn\'t work... Check your connection and try again!'}));
      },
      resetForm(clearData) {
        this.$emit('alert', {type: 'reset'});
        this.errors = [];
        if(clearData) {
          this.formData = { category: 'meeting_topic', isCurrentQuestion: true, choices: [ {name: ''}, {name: ''}, {name: ''} ]};
        }
      }
    }
  }
</script>
