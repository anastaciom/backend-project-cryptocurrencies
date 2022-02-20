const mongoose = require('mongoose')

const User = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: Infinity
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: Infinity
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
        minlength: 4,
        maxlength: Infinity
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('users', User)