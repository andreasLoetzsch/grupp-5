const express = require("express");
const router = express.Router();
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");
const { isAdmin } = require('../middleware/auth');

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.delete('/:userId', isAdmin, deleteUser);

module.exports = router;
