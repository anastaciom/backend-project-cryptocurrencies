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

    email: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        minlength: 10
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('users', User)