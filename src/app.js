const express = require('express');
const app = express();
const signUpRoutes = require('./routes/signup')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/signup', signUpRoutes)

module.exports = app
