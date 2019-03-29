import { Schema, model } from 'mongoose';

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
        ref: 'School'
    }
})

module.exports = model('User', StudentSchema)
