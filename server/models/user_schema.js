const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    encKey: {
        type: String,
        required: true
    }
}, { timestamps: true })

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passHash: {
        type: String,
        required: true,
    },
    creds: [CredentialSchema]
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;