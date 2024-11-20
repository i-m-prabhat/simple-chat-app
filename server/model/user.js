const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6,
    },
    profilePic: {
        type: String,
        required: false
    },
}, { versionKey: false, timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;