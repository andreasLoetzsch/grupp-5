const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String}
})

module.exports = mongoose.model('user', userModel)