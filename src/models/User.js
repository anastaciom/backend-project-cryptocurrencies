const mongoose = require('mongoose')

const User = new mongoose.Schema({

    name:{
        required: true,
        type: String,
        min: 3,
    },
    email:{
        required: true,
        type: String,
        min: 10,
    },
    password:{
        required: true,
        type: String,
        min: 6,
    },
})

module.exports = mongoose.model('User', User)