const express = require("express");
const router = express.Router();
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");
const { isAdmin, isLoggedIn } = require('../middleware/auth');

router.get("/", isLoggedIn, getUsers);
router.get("/:userId", isLoggedIn, getUserById);
router.delete('/:userId', isAdmin, deleteUser);

module.exports = router;
