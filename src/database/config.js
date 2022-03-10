const mongoose = require('mongoose')
require('dotenv/config')

function mongoDBConnect() {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            return console.error(err)
        }
    })
}


module.exports = mongoDBConnect