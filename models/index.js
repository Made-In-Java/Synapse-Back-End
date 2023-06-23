let mongoose = require('mongoose');
let dbURL = "mongodb+srv://" + process.env.USER + ":" + process.env.USER_KEY + "@" +
    '';
mongoose.connect(dbURL);

let Client = require('./client');
let Budget = require('./budget');

module.exports.Client = Client;
module.exports.Budget = Budget;