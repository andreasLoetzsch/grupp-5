const { getUsers, getUserById } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);

module.exports = router;
