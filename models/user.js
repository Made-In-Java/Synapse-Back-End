let mongoose = require('mongoose'),
    Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let UserSchema = new Schema({
    name: String,
    email: String,
    emailDisplay: String,
    password: String,
    document: String,
    documentDisplay: String,
    functionalities: [{
        id: ObjectId,
        name: String,
        permissions: {
            write: Boolean,
            read: Boolean
        },
        group: String,
        label: String
    }],
    signInToken: {
        token: String,
        expDate: Date
    },
    createdAt: Date,
    signInDate: Date,
    updatedAt: Date,
    historical: Array,
});

let User = mongoose.model('User', UserSchema, 'User');

module.exports = User;