require("dotenv").config();
const express = require("express");
// const User = require("../model/iser.model.js");

// const mongoose = require("mongoose");
const userroute = require("../routes/user.routes.js");
const app = express();
// const PORT = 2000;
const PORT = process.env.PORT;
const connectDatabase = require("./config/connectDB");
const {
  customError,
  errorHandler,
} = require("./middleware/custom.error.handler.js");

const DB_URI = process.env.DB_URI || 8080;

connectDatabase(DB_URI);
// to parse req.body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())

// get all users

app.use("/users", userroute);
app.all("*", (req, res, next) => {
  const message = `cannot ${req.message} om ${req.originalUrl}`;
  // res.status(404).json({
  //   status: "fail",
  //   sucess: "false",
  //   message: `cannot ${req.message} om ${req.originalUrl}`,
  // });
  // const error = new Error(message);
  const error = new customError(message, 404);
  // err.statusCode = 404;

  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sever started at port: http://localhost:${PORT}`);
});
