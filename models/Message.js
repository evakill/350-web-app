var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', MessageSchema);
