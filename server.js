const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://evakill:cis350@ds223756.mlab.com:23756/cis350", {useNewUrlParser: true});

var Message = require('./models/Message');
var Report = require('./models/Report');
var School = require('./models/School');
const UserSession = require('./models/UserSession');

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
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = school._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });

app.get('/logout', (req, res) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

/*
   * Verify a user's action
   */

app.get('/verify', (req, res) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        // DO ACTION
        return res.send({
          success: true,
          message: 'Good'
        });
      }
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
    var newSchool = new School({name, email, password, questions});

    newSchool.save((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
        return res.send({
          school: newSchool,
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

app.listen(process.env.PORT || 8080);
