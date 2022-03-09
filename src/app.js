const express = require('express');
const app = express();
const signUpRoutes = require('./routes/signUp.js');
const signInRoutes = require('./routes/signIn.js');
const dashboardRoutes = require('./routes/dashboard.js');
const adminRoute = require('./routes/admin.js');
const cors = require('cors');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/signup', signUpRoutes)
app.use('/signin', signInRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/admin', adminRoute)

module.exports = app
