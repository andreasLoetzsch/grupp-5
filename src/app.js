const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const conversationRouter = require('./routes/conversation')

app.use(express.json());

app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/conversation", conversationRouter);

module.exports = app;
