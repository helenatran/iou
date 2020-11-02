const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: false
    },
    requesterUserId: {
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
        enum: ["Open", "Closed"], // note to self: can probably change this to Open: bool field
    },
    timeCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    rewards: {
        type: Array,
        required: true
    }
}, {
    collection: 'requests'
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;