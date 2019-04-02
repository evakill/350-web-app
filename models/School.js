import { Schema, model } from 'mongoose';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    questions: {
        type: Array
    }
})

module.exports = mongoose.model('School', SchoolSchema);
