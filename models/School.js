import { Schema, model } from 'mongoose';

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
