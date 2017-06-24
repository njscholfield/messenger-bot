/* eslint quotes: 0 */

const request = require('request');
const SERVER_URL = process.env.SERVER_URL;
const PAGE_ACCESS_TOKEN = process.env.MESSENGER_PAGE_ACCESS_TOKEN;
const polls = require('./polls');

/*
 * Send an image using the Send API.
 *
 */
function sendImageMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: SERVER_URL + '/assets/rift.png'
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a Gif using the Send API.
 *
 */
function sendGifMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: SERVER_URL + '/assets/instagram_logo.gif'
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send audio using the Send API.
 *
 */
function sendAudioMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'audio',
        payload: {
          url: SERVER_URL + '/assets/sample.mp3'
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a video using the Send API.
 *
 */
function sendVideoMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'video',
        payload: {
          url: SERVER_URL + '/assets/allofus480.mov'
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a file using the Send API.
 *
 */
function sendFileMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'file',
        payload: {
          url: SERVER_URL + '/assets/test.txt'
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: 'DEVELOPER_DEFINED_METADATA'
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
function sendButtonMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'This is test text',
          buttons:[{
            type: 'web_url',
            url: 'https://www.oculus.com/en-us/rift/',
            title: 'Open Web URL'
          }, {
            type: 'postback',
            title: 'Trigger Postback',
            payload: 'DEVELOPER_DEFINED_PAYLOAD'
          }, {
            type: 'phone_number',
            title: 'Call Phone Number',
            payload: '+16505551234'
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */
function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'rift',
            subtitle: 'Next-generation virtual reality',
            item_url: 'https://www.oculus.com/en-us/rift/',
            image_url: SERVER_URL + '/assets/rift.png',
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/rift/',
              title: 'Open Web URL'
            }, {
              type: 'postback',
              title: 'Call Postback',
              payload: 'Payload for first bubble',
            }],
          }, {
            title: 'touch',
            subtitle: 'Your Hands, Now in VR',
            item_url: 'https://www.oculus.com/en-us/touch/',
            image_url: SERVER_URL + '/assets/touch.png',
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/touch/',
              title: 'Open Web URL'
            }, {
              type: 'postback',
              title: 'Call Postback',
              payload: 'Payload for second bubble',
            }]
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a receipt message using the Send API.
 *
 */
function sendReceiptMessage(recipientId) {
  // Generate a random receipt ID as the API requires a unique ID
  var receiptId = 'order' + Math.floor(Math.random()*1000);

  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      attachment: {
        type: 'template',
        payload: {
          template_type: 'receipt',
          recipient_name: 'Peter Chang',
          order_number: receiptId,
          currency: 'USD',
          payment_method: 'Visa 1234',
          timestamp: '1428444852',
          elements: [{
            title: 'Oculus Rift',
            subtitle: 'Includes: headset, sensor, remote',
            quantity: 1,
            price: 599.00,
            currency: 'USD',
            image_url: SERVER_URL + '/assets/riftsq.png'
          }, {
            title: 'Samsung Gear VR',
            subtitle: 'Frost White',
            quantity: 1,
            price: 99.99,
            currency: 'USD',
            image_url: SERVER_URL + '/assets/gearvrsq.png'
          }],
          address: {
            street_1: '1 Hacker Way',
            street_2: '',
            city: 'Menlo Park',
            postal_code: '94025',
            state: 'CA',
            country: 'US'
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66
          },
          adjustments: [{
            name: 'New Customer Discount',
            amount: -50
          }, {
            name: '$100 Off Coupon',
            amount: -100
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
function sendQuickReply(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: 'What\'s your favorite movie genre?',
      quick_replies: [
        {
          'content_type':'text',
          'title':'Action',
          'payload': JSON.stringify({type: 'test', message: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION' })
        },
        {
          'content_type':'text',
          'title':'Comedy',
          'payload':JSON.stringify({type: 'test', message: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY' })
        },
        {
          'content_type':'text',
          'title':'Drama',
          'payload':JSON.stringify({type: 'test', message: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA' })
        }
      ]
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a read receipt to indicate the message has been read
 *
 */
function sendReadReceipt(recipientId) {
  console.log('Sending a read receipt to mark message as seen');

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'mark_seen'
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId) {
  console.log('Turning typing indicator on');

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_on'
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId) {
  console.log('Turning typing indicator off');

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_off'
  };

  callSendAPI(messageData);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
function sendAccountLinking(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Welcome. Link your account.',
          buttons:[{
            type: 'account_link',
            url: SERVER_URL + '/authorize'
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

function getUserInfo(recipientId) {
  return new Promise(function(resolve) {
    request({
      uri: `https://graph.facebook.com/v2.9/${recipientId}`,
      qs: { fields: 'first_name,last_name', access_token: PAGE_ACCESS_TOKEN },
      method: 'GET'
    }, function(error, response, body) {
      body = JSON.parse(body);
      if(error) {
        console.log(error);
        resolve('Stranger');
      } else {
        console.log(body);
        resolve(body);
      }
    });
  });
}

function sendPersonalMessage(recipientId) {
  getUserInfo(recipientId)
    .then(function success(userInfo) {
      var message = `Hi ${userInfo.first_name} ${userInfo.last_name}, nice to meet you!`;
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: message
        }
      };
      callSendAPI(messageData);
    });
}

function subscribeToEmails(recipientId, email) {
  getUserInfo(recipientId)
    .then(function success(userInfo) {
      var newSubscriber = {
        'email_address': email,
        'status': 'subscribed',
        'merge_fields': {
          'FNAME': userInfo.first_name,
          'LNAME': userInfo.last_name
        }
      };
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: ''
        }
      };
      const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const validEmail = email && email.match(emailRegex);
      if(validEmail) {
        callMailChimpAPI(newSubscriber, messageData);
      } else {
        messageData.message.text = 'That email address doesn\'t seem quite right... Try again.';
        callSendAPI(messageData);
      }
    });
}

function callMailChimpAPI(newSubscriber, messageData) {
  request.post('https://us15.api.mailchimp.com/3.0/lists/45f7988056/members/', {
    auth: {
      'user': 'username',
      'pass': process.env.MAILCHIMP_KEY
    },
    json: newSubscriber
  }, function (error, response, body) {
    if(error) {
      console.log('body:', body);
      messageData.message.text = 'Sorry, that didn\'t work. Can you try again?';
    } else {
      messageData.message.text = `${body.email_address} was subscribed!`;
    }
    callSendAPI(messageData);
  });
}

function sendMeetingTopicPoll(recipientId) {
  polls.getCurrentPoll()
    .then(function success(pollData) {
      createQuestion(recipientId, pollData);
    }, function error(err) {
      console.log(err);
    });
}

function createQuestion(recipientId, pollData) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: pollData.question,
      quick_replies: [
        {
          "content_type":"text",
          "title": pollData.choices[0].name,
          "payload": JSON.stringify({ type: 'poll', title: pollData.title, choice: pollData.choices[0].name })
        },
        {
          "content_type":"text",
          "title": pollData.choices[1].name,
          "payload": JSON.stringify({ type: 'poll', title: pollData.title, choice: pollData.choices[1].name })
        },
        {
          "content_type":"text",
          "title": pollData.choices[2].name,
          "payload": JSON.stringify({ type: 'poll', title: pollData.title, choice: pollData.choices[2].name })
        }
      ]
    }
  };
  callSendAPI(messageData);
}

/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.9/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log('Successfully sent message with id %s to recipient %s',
          messageId, recipientId);
      } else {
        console.log('Successfully called Send API for recipient %s',
        recipientId);
      }
    } else {
      console.error('Failed calling Send API', response.statusCode, response.statusMessage, body.error);
    }
  });
}

module.exports = {
  sendImageMessage, sendGifMessage, sendVideoMessage, sendTextMessage, sendTypingOff, sendTypingOn, sendAccountLinking, sendQuickReply, sendReadReceipt, sendReceiptMessage, sendAudioMessage, sendFileMessage, sendButtonMessage, sendGenericMessage, sendPersonalMessage, sendMeetingTopicPoll, subscribeToEmails
};
