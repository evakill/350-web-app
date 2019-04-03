const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Message = require('./models/Message');
var Report = require('./models/Report');
var School = require('./models/School');
var Student = require('./models/Student');


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
  var question_answer = req.body.question_answer;;

  var report = new Report({
    student_id,
    school_id,
    time_of_incident,
    time_of_report,
    name,
    category,
    question_answer
  });
  report.save(function(err, rpt) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(rpt);
  });
});

app.post('/student/new', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var school = req.body.school;

  var student = new Student({
    username,
    password,
    school
  });
  student.save(function(err, stud) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(stud);
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

app.get('/questions/:school_id', function (req, res) {
  var school_id = req.params.school_id;
  School.findById(school_id, function (err, school) {
    if (err || !school) {
      return res.status(500).send(err);
    }
    return res.send(school.questions)
  });
});

app.post('/school/new', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var questions = ["Please describe the incident."]
  var school = new School({name, email, password, questions});
  school.save(function(err, school) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(school);
  });
});

app.post('/question/new/:school_id', function (req, res) {
  var question = req.body.question
  var school_id = req.params.school_id
  School.findById(school_id, function(err, school) {
    if (err) {
      return res.status(500).send(err);
    }
    school.questions.push(question)
    school.save(function(err, school) {
      if (err || !school) {
        return res.status(500).send(err);
      }
      return res.send(school.questions)
    });
  });
});

app.post('/question/delete/:school_id', function (req, res) {
  var question = req.body.question
  var school_id = req.params.school_id
  School.findById(school_id, function(err, school) {
    if (err) {
      return res.status(500).send(err);
    }
    var i = school.questions.indexOf(question)
    school.questions.splice(i, 1)
    school.save(function(err, school) {
      if (err || !school) {
        return res.status(500).send(err);
      }
      return res.send(school.questions)
    });
  });
});

app.get('/reports/:school_id', function (req, res) {
  var school_id = req.params.school_id;
  Report.find({}, function (err, reports) {
    if (err || !reports) {
      return res.status(500).send(err);
    }
    reports = reports.filter(report => report.school_id == school_id);
    return res.send(reports)
  });
});

app.get('/reports/clear/:school_id', function (req, res) {
  var school_id = req.params.school_id;
  Report.deleteMany({school_id: school_id}, function (err, reports) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(reports)
  });
});

app.listen(process.env.PORT || 8080);
