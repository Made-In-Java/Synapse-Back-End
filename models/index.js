let mongoose = require('mongoose');
let dbURL = "mongodb+srv://" + process.env.USER + ":" + process.env.USER_KEY + "@" +
    process.env.SERVER_URL;
mongoose.connect(dbURL);

let Budget = require('./budget');
let Client = require('./client');
let Equipment = require('./equipment');
let Functionality = require('./functionality');
let Project = require('./functionality');
let Service = require('./service');
let User = require('./user');

module.exports.Budget = Budget;
module.exports.Client = Client;
module.exports.Equipment = Equipment;
module.exports.Functionality = Functionality;
module.exports.Project = Project;
module.exports.Service = Service;
module.exports.User = User;