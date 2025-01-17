const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

app.use(express.json());

app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/users", userRouter);

module.exports = app;
