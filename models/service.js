let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ServiceSchema = new Schema({
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    historical: Array
});

let Service = mongoose.model('Service', ServiceSchema, 'Service');

module.exports = Service;