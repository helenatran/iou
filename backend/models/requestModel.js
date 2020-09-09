const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema ({
    task: {
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
        required: true
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

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;