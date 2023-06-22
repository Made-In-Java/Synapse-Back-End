let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: String,
    type: String,
    document: String,
    address: {
        street: String,
        neighboorhood: String,
        city: String,
        zipCode: String,
        number: String,
        complement: String,
        coordinates: Array
    },
    email: String,
    cellphone: String,
    createdAt: Date,
    updatedAt: Date,
    historical: Array,
});

let Client = mongoose.model('Client', ClientSchema, 'Client');

module.exports = Client;