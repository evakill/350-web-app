import { Schema as Schema, model } from 'mongoose';
var Schema = Schema;

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

module.exports = mongoose.model('User', UserSchema)