// Import mongoose, schema interface
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        role: { type: String, default: 'user' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('accounts', User);
