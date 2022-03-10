const express = require('express');
const app = express();
const signUpRoutes = require('./routes/signup');
const signInRoutes = require('./routes/signin');
const dashboardRoutes = require('./routes/dashboard');
const adminRoute = require('./routes/admin');
const cors = require('cors');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/signup', signUpRoutes)
app.use('/signin', signInRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/admin', adminRoute)

module.exports = app
