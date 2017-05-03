/* global Vue: false */

var inputForm = new Vue({
  el: '#newPollForm',
  data: {
    formData: {
      category: 'meeting_topic',
      isCurrentQuestion: true,
      choices: [ {name: ''}, {name: ''}, {name: ''} ]
    }
  },
  methods: {
    submit: submitNewPoll
  }
});

function submitNewPoll() {
  console.log(inputForm.formData);
  var url = '/api/createpoll/';
  var config = {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(inputForm.formData)
  };
  fetch(url, config)
    .then(blob => blob.json())
    .then(data => {
      if(!data.success) console.log(data.message);
    });
}
