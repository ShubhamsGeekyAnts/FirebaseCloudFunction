const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');

const app = express();

app.use(cors({ origin: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.use(async (req, res)=>{
    res.status(404);
    res.send({
        hasError: true,
        message: 'not found'
    });
});

app.use(async (error, req, res, next) =>{
    res.send({
        hasError : true,
        message: error.message,
    });
});




exports.curdApp = functions.https.onRequest(app);