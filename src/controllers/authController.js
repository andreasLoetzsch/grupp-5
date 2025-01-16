const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userRegister = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        console.error('Username and password required');
        return res.status(400).send('Username and password are required');
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const userLogin = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        console.error('No cridentials submited')
        res.status(400).send('No cridentials submited')
    }
    try{
        const user = await User.findOne({username})
        if(!user){
            res.json({succes: false, message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            res.json({succes: false, message: 'Invalid cridentials'})
        }
        const accesToken = jwt.sign(
            {id: user._id, role: user.role, username: user.username},
            process.env.ACCES_TOKEN_SECRET_KEY,
            {expiresIn: '2m'}
        )
        const refreshToken = jwt.sign(
            {id: user._id, role: user.role, username: user.username},
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {expiresIn: '7d'}
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
        res.json({success: true, message: 'LOGGED_IN', accesToken})
    }
    catch(error){
        res.json({succes: false, message: 'ERROR_VERIFYING'})
     }
}

module.exports = { userRegister, userLogin };
