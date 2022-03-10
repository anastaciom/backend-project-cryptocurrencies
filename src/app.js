const express = require("express");
const app = express();
const signUpRoutes = require("./routes/signUp");
const signInRoutes = require("./routes/signIn");
const dashboardRoutes = require("./routes/dashboard");
const adminRoute = require("./routes/admin");
const cors = require("cors");
const swagger = require('swagger-ui-express');
const swaggerJSON = require('../swagger.json')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swagger.serve, swagger.setup(swaggerJSON))
app.use("/signup", signUpRoutes);
app.use("/signin", signInRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", adminRoute);

module.exports = app;
