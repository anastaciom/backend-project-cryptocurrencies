const mongoose = require('mongoose')
require('dotenv/config')

function verifyUrl() {
    if (process.env.NODE_ENV === 'TEST') {
        return process.env.MONGO_URL
    }
    return process.env.DB_URL
}

function mongoDBConnect() {
    mongoose.connect(verifyUrl())
}

module.exports = mongoDBConnect