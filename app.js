require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./app/users/route');
const storiesRouter = require('./app/stories/route');
const customErrorHandler = require("./middleware/customExeption");
const notFoundHandler = require("./middleware/notFoundExeption");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/stories', storiesRouter);

app.use(customErrorHandler);
app.use(notFoundHandler);

module.exports = app;