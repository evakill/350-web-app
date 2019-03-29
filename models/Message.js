import { Schema, model } from 'mongoose';

var MessageSchema = new Schema ({
    sender_id: {
        type: String,
        required: true
    },
    recipient_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default model('Message', MessageSchema)
