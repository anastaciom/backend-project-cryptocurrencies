const express = require('express');
const app = express();
const signUpRoutes = require('./routes/signUp')
const signInRoutes = require('./routes/signIn')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/signup', signUpRoutes)
app.use('/signin', signInRoutes)

module.exports = app
