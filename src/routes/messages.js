const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUserConversations } = require('../controllers/messageController');
const { isLoggedIn } = require('../middleware/auth');

// Skicka ett meddelande
router.post('/', isLoggedIn, sendMessage);

// Hämta meddelanden i en konversation
router.get('/:conversationId', isLoggedIn, getMessages);

// Hämta alla konversationer för en användare
router.get('/', isLoggedIn, getUserConversations);

module.exports = router;