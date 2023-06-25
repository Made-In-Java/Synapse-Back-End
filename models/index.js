let mongoose = require('mongoose');
let dbURL = "mongodb+srv://" + process.env.USER + ":" + process.env.USER_KEY + "@" +
    process.env.SERVER_URL;
mongoose.connect(dbURL);

let Client = require('./client');
let Budget = require('./budget');
let User = require('./user');

module.exports.Client = Client;
module.exports.Budget = Budget;
module.exports.User = User;