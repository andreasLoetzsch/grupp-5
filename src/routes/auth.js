const {userRegister, userLogin, refreshToken} = require('../controllers/authController')
const express = require('express')
const router = express.Router()

router.post('/refresh-token', refreshToken)
router.post('/register', userRegister)
router.post('/login', userLogin)

module.exports = router