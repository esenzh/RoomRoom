module.exports = function (app) {
    const express = require('express');
    const morgan = require('morgan');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    const FileStore = require('session-file-store')(session);
    const dbConnection = require('./db-connect');

    app.use(morgan('dev'));

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(cookieParser());

    app.use(
        session({
            store: new FileStore(),
            key: 'user_sid',
            secret: 'very secret',
            resave: false,
            saveUninitialized: false,
        }),
    );
};