const mongoose = require("mongoose");
const Conversation  = require('../models/conversationModel')
const Message = require('../models/messageModel');
const User = require('../models/userModel')

const createConversation = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const creatorId = req.user.id;
        let { participants } = req.body;

       
        if (!Array.isArray(participants)) {
            participants = [];
        }
        
       
        if (!participants.includes(creatorId)) {
            participants.push(creatorId);
        }

        const conversation = new Conversation({
            participants: participants
        });

        await conversation.save();
        res.status(201).json({ success: true, message: "Conversation created", conversation });
    } catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


  
  const getConversation = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const conversations = await Conversation.find({
        participants: userId
      }).select('_id');
  
    
      const conversationIds = conversations.map(conversation => conversation._id);
  
      res.status(200).json({ success: true, conversationIds });
    } catch (error) {
      console.error('Error fetching conversations', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  
  
  
  const inviteToConversation = async (req, res) => {
    try {
      const conversationId = req.params.conversationId
      const invitedUserId = req.params.userId;
  
      const invitedUser = await User.findById(invitedUserId);
  
  
  
      if (!invitedUser) {
        return res.status(404).json({
          success: false,
          message: 'Invited user not found'
        });
      }
  
      const conversation = await Conversation.findById(conversationId)
      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: 'Conversation not found'
        });
      }
  
      if (conversation.participants.includes(invitedUserId)) {
        return res.status(400).json({
          success: false,
          message: 'User is already in the conversation'
        });
      }
  
      conversation.participants.push(invitedUserId);
      await invitedUser.save();
  
      res.status(200).json({
        success: true,
        message: 'User invited to conversation successfully',
        conversation
      });
    } catch (error) {
      console.error('Error inviting user to conversation:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
 const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id; // Authenticated user

     
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({ success: false, message: "Invalid conversation ID" });
        }

    
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        if (!conversation.participants.map(id => id.toString()).includes(userId)) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this conversation" });
        }

     
        await Message.deleteMany({ conversationId });

      
        await Conversation.findByIdAndDelete(conversationId);

        res.status(200).json({ success: true, message: "Conversation deleted successfully" });

    } catch (error) {
        console.error("Error deleting conversation:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

  
module.exports = {createConversation, getConversation, inviteToConversation, deleteConversation}