const express = require('express');
const indexRouter = require('./routes/index');
const userMiddleWare = require('./middleware');
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();

userMiddleWare(app);

app.use('/', indexRouter);

useErrorHandlers(app);

module.exports = app;
