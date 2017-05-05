/* global Vue: false */

Vue.component('success-alert', {
  props: ['message'],
  template: `<div class="alert alert-dismissible alert-success">
  <button type="button" class="close" @click="hide">&times;</button>{{ message }}</div>`,
  methods: {
    hide() {
      this.$emit('hide');
    }
  }
});

Vue.component('error-alert', {
  props: ['message'],
  template: `<div class="alert alert-dismissible alert-danger">
  <button type="button" class="close" @click="hide">&times;</button>{{ message }}</div>`,
  methods: {
    hide() {
      this.$emit('hide');
    }
  }
});

var alerts = new Vue({
  el: '#alerts',
  data: {
    success: { visible: false, message: 'Success' },
    error: { visible: false, message: 'Error' }
  },
  methods: {
    show(type, message) {
      this[type].visible = true;
      this[type].message = message;
    },
    hide(type) {
      this[type].visible = false;
    },
    reset() {
      this.success.visible = false;
      this.error.visible = false;
    }
  }
});

var inputForm = new Vue({
  el: '#newPollForm',
  data: {
    formData: {
      category: 'meeting_topic',
      isCurrentQuestion: true,
      choices: [ {name: ''}, {name: ''}, {name: ''} ]
    },
    errors: []
  },
  methods: {
    submit: submitNewPoll,
    resetForm(clearData) {
      alerts.reset();
      this.errors = [];
      if(clearData) {
        this.formData = { category: 'meeting_topic', isCurrentQuestion: true, choices: [ {name: ''}, {name: ''}, {name: ''} ]};
      }
    }
  }
});

function submitNewPoll() {
  var config = {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(inputForm.formData)
  };
  fetch('/api/createpoll/', config)
    .then(blob => blob.json())
    .then(data => {
      if(data.success) {
        inputForm.resetForm(true);
        alerts.show('success', 'Poll successfully submitted!');
      } else {
        inputForm.resetForm(false);
        alerts.show('error', data.message);
        inputForm.errors = data.fields;
      }
    });
}
