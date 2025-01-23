const express = require("express");
const router = express.Router();
const { getUsers, getUserById, deleteUser, updateUser } = require("../controllers/userController");
const { isAdmin, isLoggedIn } = require('../middleware/auth');

router.get("/", isLoggedIn, getUsers);
router.get("/:userId", isLoggedIn, getUserById);
router.delete('/:userId', isAdmin, deleteUser);
router.patch('/edit:userId', isLoggedIn, updateUser);

module.exports = router;
