const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favourSchema = new Schema ({
    favourName: {
        type: String,
        required: true
    },
    oweUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Favour = mongoose.model('Favour', favourSchema);

module.exports = Favour;