const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema ({
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
    isClaimedCompleted: {
        type: Boolean,
        required: true
    },
    completerUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    proof: {
        type: String,
        required: true
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
        required: true
    }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;