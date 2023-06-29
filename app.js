var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

/* Controllers */
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var budgetsRouter = require('./routes/budgets');
var clientsRouter = require('./routes/clients');
var equipmentsRouter = require('./routes/equipments');
var functionalitiesRouter = require('./routes/functionalities');
var projectsRouter = require('./routes/projects');
var servicesRouter = require('./routes/services');
var usersRouter = require('./routes/users');

/* Middlewares */
const auth = require('./middleware/auth');

var app = express();


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* Routes */
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/budgets', auth.isAuthorized, budgetsRouter);
app.use('/clients', auth.isAuthorized, clientsRouter);
app.use('/equipments', auth.isAuthorized, equipmentsRouter);
app.use('/functionalities', auth.isAuthorized, functionalitiesRouter);
app.use('/projects', auth.isAuthorized, projectsRouter);
app.use('/services', auth.isAuthorized, servicesRouter);
app.use('/users', auth.isAuthorized, usersRouter);

module.exports = app;
