const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');

const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    try {
    
        let conversation = await Conversation.findOne({ 
            participants: { $all: [senderId, receiverId] } 
        });

        if (!conversation) {
            conversation = new Conversation({ participants: [senderId, receiverId] });
            await conversation.save();
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            conversationId: conversation._id,
            content
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent', data: newMessage });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getMessages = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversationId })
            .sort({ timestamp: 1 })
            .populate('senderId', 'username')
            .populate('receiverId', 'username');

        res.status(200).json({ success: true, data: messages });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getUserConversations = async (req, res) => {
    const userId = req.user.id;

    try {
        const conversations = await Conversation.find({ participants: userId })
            .populate('participants', 'username');

        res.status(200).json({ success: true, data: conversations });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteMessage = async (req, res) => {
    const { msgID } = req.params;
    const userId = req.user.id;

    try {
        const message = await Message.findById(msgID);

        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        if (message.senderId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this message" });
        }

        await Message.findByIdAndDelete(msgID);
        res.status(200).json({ success: true, message: "Message deleted successfully" });

    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { sendMessage, getMessages, getUserConversations, deleteMessage };