const express = require("express");
// const mongoose = require("mongoose");
const userroute = require("./routes/user.routes");
const app = express();
const PORT = 8000;
const connectDatabase = require("./config/connectDB");

const DB_URI = "mongodb://127.0.0.1:27017/crud-users";

connectDatabase(DB_URI);
// to parse req.body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())

// get all users

app.use("/users", userroute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "Error",
    message: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Sever started at port: http://localhost:${PORT}`);
});
