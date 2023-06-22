let mongoose = require('mongoose'),
    Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let BudgetSchema = new Schema({
    address: {
        street: String,
        neighboorhood: String,
        city: String,
        zipCode: String,
        number: String,
        complement: String,
        coordinates: Array
    },
    tecnicalCosts: {
        equipment: Number,
        displacement: Number,
        stationary: Number,
        other: Number
    },
    services: [{
        id: ObjectId,
        name: String
    }],
    team: [{
        userId: ObjectId,
        hoursQuantity: Number,
        hourValue: Number
    }],
    status: String,
    historical: Array,
    createdAt: Date,
    updatedAt: Date,
    client: {
        id: ObjectId,
        name: String
    }
});

let Client = mongoose.model('Budget', BudgetSchema, 'Budget');

module.exports = Client;