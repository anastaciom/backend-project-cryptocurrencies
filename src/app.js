const express = require('express');
const app = express();
const signUpRoutes = require('./routes/signUp')
const signInRoutes = require('./routes/signIn')
const dashboardRoutes = require('./routes/dashboard')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/signup', signUpRoutes)
app.use('/signin', signInRoutes)
app.use('/dashboard', dashboardRoutes)

module.exports = app
