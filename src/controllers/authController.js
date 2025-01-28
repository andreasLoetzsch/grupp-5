const  User  = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userRegister = async (req, res) => {
    const { username, password, email, role, } = req.body;

    if (!username || !password) {
        console.error('Username and password required');
        return res.status(400).send('Username and password are required');
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await new User({ username, password: hashedPassword, role, email });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const userLogin = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        console.error('No credentials submited')
        return res.status(400).send('No credentials submited')
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ succes: false, message: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ succes: false, message: 'Invalid credentials' })
        }
        const accessToken = jwt.sign(
            { id: user._id, username: user.username, role: user.role, email: user.email },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: '7d' }
        )

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
        user.refreshToken = hashedRefreshToken
        await user.save()
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: 'LOGGED_IN', accessToken })
    }
    catch (error) {

        return res.status(500).json({ succes: false, message: 'ERROR_VERIFYING' })

    }
}

const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies
    const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.split(" ")[1]
    if (!refreshToken) {
        return res.status(403).send('Token missing')
    }
    try {
        if (accessToken) {
            try {
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
                return res.status(200).json({ accessToken, message: 'Token not expired' })
            } catch (error) {
                if (error.name !== "TokenExpiredError") {
                    return res.status(403).send('Invalid token')
                }
            }
        }
        const decoded = jwt.decode(refreshToken)
        const user = await User.findOne({ _id: decoded.id }, "_id username refreshToken")
        if (!user) {
            res.status(403).send('User missing')
        }
        const isValid = await bcrypt.compare(refreshToken, user.refreshToken)
        if (!isValid) {
            return res.status(403).send('Invalid token')
        }
        const newAccessToken = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: '15m' }
        )
        const newRefreshToken = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: '7d' }
        )
        const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10)
        user.refreshToken = hashedRefreshToken
        await user.save()
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ accessToken: newAccessToken })
    }
    catch (error) {
        res.status(500).send('Server error')
    }
}



module.exports = { userRegister, userLogin, refreshToken };
