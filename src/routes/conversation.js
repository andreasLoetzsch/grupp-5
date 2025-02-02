const express = require("express");
const router = express.Router();
const { 
  createConversation, 
  getConversation, 
  inviteToConversation, deleteConversation
} = require("../controllers/conversationController");
const { isLoggedIn } = require("../middleware/auth");
const Conversation = require("../models/conversationModel");


router.post("/", isLoggedIn, createConversation);


router.get("/", isLoggedIn, getConversation);


router.post("/:conversationId/invite/:userId", isLoggedIn, inviteToConversation);


router.delete("/:conversationId", isLoggedIn, deleteConversation);

module.exports = router;
