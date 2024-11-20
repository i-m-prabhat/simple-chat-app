const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        required: true
    },
    // messages: {
    //     type: [
    //         {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Message'
    //         }
    //     ]
    // },
    // name: {
    //     type: String,
    //     required: true
    // },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    unreadMessageCount: {
        type: Number,
        default: 0
    }

}, { versionKey: false, timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;