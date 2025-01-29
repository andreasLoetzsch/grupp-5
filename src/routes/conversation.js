const express = require("express");
const router = express.Router();
const { createConversation, getConversation, inviteToConversation, } = require("../controllers/conversationController");
const { isLoggedIn, verifyAuth } = require("../middleware/auth");
const { Conversation } = require("../models/conversationModels");

router.post("/", isLoggedIn, createConversation);

router.get("/", isLoggedIn, getConversation);

router.post("/:conversationId/invite/:userId", isLoggedIn, inviteToConversation);

router.get("/conversations", verifyAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find(
      { participants: userId },
      "_id"
    );

    const conversationIds = conversations.map((conversation) => conversation._id);

    res.status(200).json({ success: true, conversationIds });
  } catch (error) {
    console.error("Fel vid hämtning av konversationer:", error);
    res
      .status(500)
      .json({ error: "Ett fel uppstod vid hämtning av konversationer." });
  }
});

module.exports = router;