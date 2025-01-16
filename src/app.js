const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
app.use(express.json());

app.use(cookieParser())
app.use('/auth', authRouter)

module.exports = app;
