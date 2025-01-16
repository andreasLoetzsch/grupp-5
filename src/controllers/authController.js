const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

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

module.exports = { userRegister };
