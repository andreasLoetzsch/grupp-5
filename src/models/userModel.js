const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String},
    role: { type: String },
    refreshToken: { type: String },
});



module.exports = mongoose.model('user', userModel);