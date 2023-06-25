var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var clientsRouter = require('./routes/clients');
var budgetsRouter = require('./routes/budgets');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/clients', clientsRouter);
//app.use('/projects', usersRouter);
app.use('/budgets', budgetsRouter);
//app.use('/equipments', usersRouter);
//app.use('/services', usersRouter);

module.exports = app;
