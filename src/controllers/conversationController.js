const Conversation  = require('../models/conversationModel')
const User = require('../models/userModel')

const createConversation = async (req, res) => {
    try {
      const creatorId = req.user.id
      const conversation = new Conversation({
        participants: [creatorId]
      })
      await conversation.save()
      res.status(200).json({ sucess: true, message: 'Conversation created', conversation })
    } catch (error) {
      console.error('Error creating conversation', error)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  }
  
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
  
module.exports = {createConversation, getConversation, inviteToConversation}