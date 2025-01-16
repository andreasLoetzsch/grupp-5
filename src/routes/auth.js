const {userRegister, userLogin} = require('../controllers/authController')
const express = require('express')
const router = express.Router()

router.post('/register', userRegister);
router.post('/login', userLogin)

module.exports = router