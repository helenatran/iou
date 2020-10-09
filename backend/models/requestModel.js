const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    requesterUserID: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    completerUserId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    proof: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["Open", "Pending Requester Confirmation", "Closed"]
    },
    timeCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    requestExpiry: {
        type: Date,
        required: false
    }
}, {
    collection: 'requests'
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;