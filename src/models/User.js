const mongoose = require('mongoose')

const User = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 4
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        minlength: 4
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('users', User)