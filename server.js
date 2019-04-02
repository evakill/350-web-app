const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://evakill:cis350@ds223756.mlab.com:23756/cis350", {useNewUrlParser: true});

var Message = require('./models/Message');
var School = require('./models/School');
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
/*
   * Sign up
   */
app.post('/signup', (req, res, next) => {
  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;
  let {
    name
  } = body;
  let {
    questions
  } = body
  
  email = email.toLowerCase();
  email = email.trim();
  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  School.find({
    email: email
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }
    // Save the new user
    const newSchool = new School();
    newSchool.email = email;
    newSchool.password = password;
    newSchool.name = name;
    newschool.questions = questions;

    newSchool.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });
  });
}); // end of sign up endpoint


app.post('/message/new', function (req, res) {
  var sender_id = req.body.sender_id;
  var recipient_id = req.body.recipient_id;
  var text = req.body.text;
  if (sender_id && recipient_id && text) {
    var timestamp = new Date();
    var message = new Message({sender_id, recipient_id, text, timestamp});
    message.save(function(err, msg) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send({
        result: {
          sender_id: message.sender_id,
          recipient_id: message.recipient_id,
          text: message.text,
          timestamp: message.timestamp,
        }
      });
    });
  } else {
    return res.status(400).send({ error: "Missing sender_id, recipient_id, or text." });
  }
});

app.listen(process.env.PORT || 8080);
