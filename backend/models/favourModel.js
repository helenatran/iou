const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavourSchema = new Schema({
    favourName: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    oweUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    owner: {
        type: Object
    },
    ower: {
        type: Object
    },
    favourComment: {
        type: String,
        required: false
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    oweMe: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    proof: {
        type: String,
        required: false
    },
    timeCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Favour = mongoose.model('Favour', FavourSchema);

module.exports = Favour;