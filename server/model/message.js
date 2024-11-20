const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: String,
    user: String

}, { versionKey: false, timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;