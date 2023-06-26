let mongoose = require('mongoose'),
    Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let ProjectSchema = new Schema({
    address: {
        street: String,
        neighborhood: String,
        city: String,
        zipCode: String,
        number: String,
        complement: String,
        coordinates: Array
    },
    tecnicalCosts: {
        hourValue: Number,
        hoursQuantity: Number,
    },
    expenses: {
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
    historical: Array,
    approvalDate: Date,
    conslusionDate: Date,
    createdAt: { type: Date, default: new Date() },
    updatedAt: Date,
    client: {}
});

let Project = mongoose.model('Project', ProjectSchema, 'Project');

module.exports = Project;