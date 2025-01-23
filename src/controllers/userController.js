const User = require("../models/userModel");

const getUsers = async (req, res) => {
  const users = await User.find({}, "_id username role");
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
    const { name, email } = req.body;

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    if (name) user.name = name;
    if (email) user.email = email;


    await user.save();

    res.status(200).json({
      success: true,
      message: "User successfully updated",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




module.exports = { getUsers, getUserById, deleteUser, updateUser };

