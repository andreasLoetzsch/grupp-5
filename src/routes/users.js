const express = require("express");
const router = express.Router();
const { getUsers, getUserById, deleteUser, updateUser, createConversation, getConversation, inviteToConversation } = require("../controllers/userController");
const { isAdmin, isLoggedIn } = require('../middleware/auth');

router.get("/", isLoggedIn, getUsers);
router.get("/:userId", isLoggedIn, getUserById);
router.delete('/:userId', isAdmin, deleteUser);
router.patch('/edit:userId', isLoggedIn, updateUser);
router.post('/create-conversation', isLoggedIn, createConversation)
router.post('/get-conversation', isLoggedIn, getConversation)
router.post('/invite-conversation/:userId', isLoggedIn, inviteToConversation)

module.exports = router;
