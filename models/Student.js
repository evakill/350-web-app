var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    school: {
        type: Schema.ObjectId,
        ref: 'School',
        required: true
    }
})

module.exports = mongoose.model('Student', StudentSchema)
