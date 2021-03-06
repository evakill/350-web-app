const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://evakill:cis350@ds223756.mlab.com:23756/cis350", {useNewUrlParser: true});

var Message = require('./models/Message');
var Report = require('./models/Report');
var School = require('./models/School');

var Student = require('./models/Student');


var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', (socket) => {
 console.log('A user has connected.')
})

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
         console.log(err)
         return res.status(500).send(err);
       }

       // Update the report with the new message
       report.messages.push(msg);

       report.save(function(err, rpt) {
         if (err) {
           console.log(err)
           return res.status(500).send(err);
         }
         var json = {report_id: report_id, message: msg}
         console.log("new message sent")
         io.emit('new message', json);
       })
       return res.send(report)
     });
   })
 });


app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/signin', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    School.find({
      email: email
    }, (err, schools) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (schools.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const school = schools[0];
      if (school.password !== password) {
        return res.send({
          success: false,
          message: 'Error: Invalid Password'
        });
      }

      return res.send({
        success: true,
        message: 'Valid sign in',
        schoolID: school._id,
      });
    });
  });


/*
   * Sign up
   */
app.post('/signup', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var questions = ["Please describe the incident."]

  // email = email.toLowerCase();
  // email = email.trim();
  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save

  School.count({
    name: name
  }, (err, count) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (count > 0) {
      return res.send({
        success: false,
        message: 'Error: School already exist. Try logging in instead.'
      });
    }
    // Save the new user
    var newSchool = new School({name, email, password, questions});

    newSchool.save((err, school) => {
      if (err) {
        return res.status(500).send(err);
      }
        return res.send({
          schoolID: school._id,
          success: true
        });
    });

  });
}); // end of sign up endpoint


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
  var time_of_incident = new Date(req.body.time_of_incident);
  var time_of_report = new Date();
  var category = req.body.category;
  var question_answer = JSON.parse(req.body.question_answer);
  var contact = req.body.contact;

  var report = new Report({
    student_id,
    school_id,
    time_of_incident,
    time_of_report,
    name,
    category,
    question_answer,
    contact
  });
  report.save(function(err, rpt) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.send(rpt);
  });
});

app.post('/student/new', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var school = req.body.school;
  School.find({
      name: school
    }, (err, schools) => {
      if (err) {
          return res.status(500).send(err);
      }
      if (schools.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      Student.count({
        username: username
      }, (err, count) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (count > 0) {
          return res.send({
            success: false,
            message: 'Error: Username already exist. Try logging in instead.'
          });
        }
      var schoolObj = schools[0];
      var school = schoolObj._id.toString()

    var student = new Student({
      username,
      password,
      school,
    });
        student.save(function(err, stud) {
          if (err) {
            return res.status(500).send(err);
          }
          return res.send(stud);
        });
     });
  });
});

app.get('/schoolverify', function (req, res){
  var schoolName = req.query.schoolName;
  School.find({
      name: schoolName
    }, (err, schools) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (schools.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const school = schools[0];
      return res.send({
          success: true,
          message: 'Valid School',
          school: school,
        });
    });
})

app.get('/studentverify', function(req, res) {
  var studentName = req.query.studentName;
  Student.count({
        username: studentName
      }, (err, count) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (count > 0) {
          return res.send({
            success: false,
            message: 'Error: Username already exist. Try logging in instead.'
          });
        }
        return res.send({
          success: true,
          message: 'Valid Username',
        });
      });
    });


app.get('/androidstudent/signin', function (req, res) {
  var username = req.query.username;
  var password = req.query.password;
  Student.find({
      username: username
    }, (err, students) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (students.length != 1) {
        return res.send({
          success: false,
          message: "username does not exist"
        });
      }
      const student = students[0];
      if (student.password !== password) {
        return res.send({
          success: false,
          message: 'Error: Invalid Password'
        });
      }
      return res.send({
        success: true,
        message: 'Valid sign in',
        student: student,
      });
    });
  });



app.get('/questions/:school_id', function (req, res) {
  var school_id = req.params.school_id;
  School.findById(school_id, function (err, school) {
    if (err || !school) {
      return res.status(500).send(err);
    }
    var questionObject = {questions: school.questions};
    return res.send(questionObject)
  });
});

app.get('/schools', function (req, res) {
  School.find((err, schools) => {
    if (!schools) {
      return res.status(404).send(err);
    }
    return res.send(schools);
  })
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
  Report.find({school_id: school_id}, function (err, reports) {
    if (err || !reports) {
      return res.status(500).send(err);
    }
    var last_msg_ids = []
    reports.forEach(function(report) {
      if (report.messages.length > 0) {
        var last_msg = report.messages[report.messages.length - 1]
        last_msg_ids.push(last_msg);
      }
    })

    Message.find({'_id': {$in: last_msg_ids}}, function(err, msgs) {
      if (err || !reports) {
        return res.status(500).send(err);
      }
      var lastMessages = []
      reports.forEach(function(report) {
        var last_message = null
        if (report.messages.length > 0) {
          var last_msg_id = report.messages[report.messages.length - 1]
          msgs.forEach(function(message) {
            if (last_msg_id.equals(message._id)) {
              last_message = message
            }
          })
        }
        lastMessages.push({reportID: report._id, last_message: last_message})
      })
      // console.log(json_array)
      return res.send({reports: reports, lastMessages: lastMessages})
    })
  });
});

app.get('/reports/student/:student_id', function (req, res) {
  var student_id = req.params.student_id;
  Report.find({student_id: student_id}, function (err, reports) {
    if (err || !reports) {
      return res.status(500).send(err);
    }
    var last_msg_ids = []
    reports.forEach(function(report) {
      if (report.messages.length > 0) {
        var last_msg = report.messages[report.messages.length - 1]
        last_msg_ids.push(last_msg);
      }
    })

    Message.find({'_id': {$in: last_msg_ids}}, function(err, msgs) {
      if (err || !reports) {
        return res.status(500).send(err);
      }
      var json_array = []
      reports.forEach(function(report) {
        var last_message = null
        if (report.messages.length > 0) {
          var last_msg_id = report.messages[report.messages.length - 1]
          msgs.forEach(function(message) {
            if (last_msg_id.equals(message._id)) {
              last_message = message
            }
          })
        }
        json_array.push({report: report, last_message: last_message})
      })
      return res.send(json_array)
    })
  });
});

app.get('/reports/id/:report_id', function (req, res) {
  var report_id = req.params.report_id;
  Report.findById(report_id, function (err, report) {
    if (err || !report) {
      return res.status(500).send(err);
    }
    return res.send([{"report": report}]);
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


app.get('/school/:school_id', function (req, res) {
  var school_id = req.params.school_id;
  School.findById(school_id, function (err, school) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(school)
  });
});

server.listen(8000, function(){
  console.log('listening')
})

app.listen(process.env.PORT || 8080);
