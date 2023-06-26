let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EquipmentSchema = new Schema({
    name: String,
    brand: String,
    description: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: Date,
    acquisitionDate: Date,
    historical: Array
});

let Equipment = mongoose.model('Equipment', EquipmentSchema, 'Equipment');

module.exports = Equipment;