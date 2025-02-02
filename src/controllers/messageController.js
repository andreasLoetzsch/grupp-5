const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const User = require('../models/userModel'); 

const sendMessage = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        const senderId = req.user.id;
        let { conversationId, receiverId, content } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({ success: false, message: "Message content cannot be empty" });
        }

        let conversation;

        if (conversationId) {

            conversation = await Conversation.findById(conversationId);
            if (!conversation) {
                return res.status(404).json({ success: false, message: "Conversation not found" });
            }
        } else {

            if (!receiverId) {
                return res.status(400).json({ success: false, message: "receiverId or conversationId is required" });
            }

          
            const receiver = await User.findById(receiverId);
            if (!receiver) {
                return res.status(404).json({ success: false, message: "Receiver not found" });
            }

            conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            if (!conversation) {
                conversation = new Conversation({
                    participants: [senderId, receiverId]
                });
                await conversation.save();
            }
        }

        if (!conversation.participants.includes(senderId)) {
            return res.status(403).json({ success: false, message: "You are not a participant in this conversation" });
        }

       
        const newMessage = new Message({
            senderId,
            receiverId,
            conversationId: conversation._id,
            content
        });

        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent", data: newMessage });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getMessages = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversationId })
            .sort({ timestamp: 1 })
            .populate('senderId', 'username') 
            .populate({
                path: 'conversationId',
                select: 'participants',
                populate: { path: 'participants', model: 'User', select: 'username' } 
            });

        res.status(200).json({ success: true, data: messages });

    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getUserConversations = async (req, res) => {
    const userId = req.user.id;

    try {
        const conversations = await Conversation.find({ participants: userId })
            .populate({
                path: 'participants',
                model: 'User', 
                select: 'username'
            });

        res.status(200).json({ success: true, data: conversations });

    } catch (error) {
        console.error("Error fetching user conversations:", error);
        res.status(500).json({ success: false, message: "Server error" });
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
