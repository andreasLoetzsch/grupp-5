const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUserConversations } = require('../controllers/messageController');
const { isLoggedIn } = require('../middleware/auth');


router.post('/', isLoggedIn, sendMessage);

router.get('/:conversationId', isLoggedIn, getMessages);

router.get('/', isLoggedIn, getUserConversations);

router.delete('/:msgID', isLoggedIn, deleteMessage);

module.exports = router;