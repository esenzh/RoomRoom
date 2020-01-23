const express = require('express');
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');

const userMiddleWare = require('./middleware');
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();

userMiddleWare(app);

app.use('/', indexRouter);
app.use('/', authenticationRouter);

useErrorHandlers(app);

module.exports = app;
