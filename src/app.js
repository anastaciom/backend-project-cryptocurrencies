const express = require('express');
const app = express();
const sessionsRoutes = require('./routes/sessions')
const mongoDBConfig = require('./database/config')

mongoDBConfig()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/sessions', sessionsRoutes)

module.exports = app
