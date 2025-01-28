const { User } = require("../models/userModel");


const getUsers = async (req, res) => {
  const users = await User.find({}, "_id username role email");
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById({ _id: req.params.userId }, "_id username role");

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }


    if (req.user.id === req.params.userId) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete your own admin account'
      });
    }

    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({
      success: true,
      message: 'User successfully deleted'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    if (username) user.username = username;
    if (email) user.email = email;


    await user.save();

    res.status(200).json({
      success: true,
      message: "User successfully updated"
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const inviteUserToConversation = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const invitedUserId = req.params.userId;

    const invitedUser = await User.findById(invitedUserId);
    if (!invitedUser) {
      return res.status(404).json({
        success: false,
        message: 'Invited user not found'
      });
    }

    const conversation = invitedUser.conversations.id(conversationId);
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




module.exports = { getUsers, getUserById, deleteUser, updateUser, inviteUserToConversation };

