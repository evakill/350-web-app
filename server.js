const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Message = require('./models/Message');
var Report = require('./models/Report');

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', () =>{
 console.log('A user has connected.')
})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/messages', function (req, res) {
  var report_id = req.query.report_id;
  Report.findById(report_id, function (err, report) {
    if (err) {
      return res.status(500).send(err);
    }
    Message.find({_id: { $in: report.messages } }, function(err, messages) {
      if (err) {
        return res.status(500).send(err);
      }
      messages.sort(function(m1, m2) {
        if (m1.timestamp < m2.timestamp) {
          return -1;
        } else if (m1.timestamp > m2.timestamp) {
          return 1;
        }
        return 0;
      });
      return res.send(messages);
    });
  });
});

app.post('/reports/new', function (req, res) {
  var student_id = req.body.student_id;
  var school_id = req.body.school_id;
  var name = req.body.name;
  var time_of_incident = new Date();
  var time_of_report = new Date();
  var category = req.body.category;
  var question_answer = [];

  var report = new Report({
    student_id,
    school_id,
    time_of_incident,
    time_of_report,
    name,
    category
  });
  report.save(function(err, rpt) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.sendStatus(200);
  });
});

app.post('/messages/new', function (req, res) {
  var report_id = req.body.report_id;
  if (!report_id) {
    return res.status(400).send("Missing report_id.");
  }

  var sender_id = req.body.sender_id;
  var recipient_id = req.body.recipient_id;
  var text = req.body.text;
  var timestamp = new Date();

  var message = new Message({sender_id, recipient_id, text, timestamp});

  // Get the report
  Report.findById(report_id, function(err, report) {
    if (err) {
      return res.status(500).send(err);
    }
    // Save the message
    message.save(function(err, msg) {
      if (err) {
        return res.status(500).send(err);
      }

      // Update the report with the new message
      report.messages.push(msg);
      report.save(function(err, rpt) {
        if (err) {
          return res.status(500).send(err);
        }

        io.emit('message', msg);
        return res.sendStatus(200);
      });
    });
  });
});

app.listen(process.env.PORT || 8080);
