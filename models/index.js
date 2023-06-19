let mongoose = require('mongoose');
let dbURL = "mongodb+srv://" + process.env.USER + ":" + process.env.USER_KEY + "@" +
    'synapsesoftwaredatabase.93xqzck.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL);

let Client = require('./client');

module.exports.Client = Client;