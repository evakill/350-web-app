var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema ({
    student_id: {
        type: Schema.ObjectId,
        ref: 'Student',
        required: true
    },
    school_id: {
        type: Schema.ObjectId,
        ref: 'School',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time_of_incident: {
        type: Date,
        required: true
    },
    time_of_report: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    question_answer: {
        type: Array,
        required: true
    },
    messages: [{
        type: Schema.ObjectId,
        ref: 'Message',
        required: true
    }]
})

module.exports = mongoose.model('Report', ReportSchema);
