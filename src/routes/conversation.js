const express = require("express");
const router = express.Router();
const {createConversation, getConversation, inviteToConversation} = require('../controllers/conversationController')
const {isLoggedIn} = require('../middleware/auth')

router.post('/', isLoggedIn, createConversation)
router.get('/', isLoggedIn, getConversation)
router.post('/:conversationId/invite/:userId', isLoggedIn, inviteToConversation)

module.exports = router;