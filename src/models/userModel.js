const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String},
    role: { type: String },
    refreshToken: { type: String },
});

const User = mongoose.model('User', userModel);
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = { User, Conversation };