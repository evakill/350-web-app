import { Schema, model } from 'mongoose';

var ReportSchema = new Schema ({
    student_id: {
        type: Schema.ObjectId,
        ref: 'Student',
        required: true
    },
    school_id: {
        type: Schema.ObjectId,
        ref: 'School',
        requried: true
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
    }
})

export default model('Report', ReportSchema)
