import { Schema as Schema, model } from 'mongoose';
var Schema = Schema;

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

export default model('School', SchoolSchema)