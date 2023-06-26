let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let FunctionalitySchema = new Schema({
    name: String,
    permissions: {
        write: Boolean,
        read: Boolean
    },
    group: String,
    Label: String
});

let Functionality = mongoose.model('Functionality', FunctionalitySchema, 'Functionality');

module.exports = Functionality;