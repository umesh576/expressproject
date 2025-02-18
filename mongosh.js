const express = require("express");
const Users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const DB_URI = "mongodb://127.0.0.1:27017/crud-users";
const app = express();
const PORT = 8000;

// connecct db
mongoose
  .connect(DB_URI)
  .then((err, res) => {
    console.log("data base connected");
  })
  .catch((err) => {
    console.log("database cannot connected ", err);
  });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // if name doesn't enter then it can throught the error
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  age: {
    type: Number,
    required: false,
    // unique: true,
    unique: true,
  },
});
const User = mongoose.model("user", UserSchema);

// to parse req.body
app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  //   return res.status(200).json(Users);
  try {
    const users = await User.find();
    return res.status(200).json({
      sucess: true,
      status: "sucess",
      data: users,
      message: "User created sucessfully",
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      status: "error",
      message: err.message ?? "somethind went wrong",
      data: null,
    });
  }
});

// app.post("/users", async (req, res) => {
//   try {
//     const body = req.body;
//     console.log(body);

//     const user = await User.create(body);
//     console.log("new users ", user);
//     return res.status(201).json({
//       sucess: true,
//       status: "sucess",
//       data: user,
//       message: "User created sucessfully",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       sucess: false,
//       status: "error",
//       message: err.message ?? "somethind went wrong",
//       data: null,
//     });
//   }
// });
// app.post("/users", async (req, res) => {
//   try {
//     const body = req.body;

//     // Check if a user with the same email already exists
//     const existingUser = await User.findOne({ email: body.email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         status: "error",
//         message: "Email already exists",
//         data: null,
//       });
//     }

//     // Create new user
//     const user = await User.create(body);
//     return res.status(201).json({
//       success: true,
//       status: "success",
//       data: user,
//       message: "User created successfully",
//     });
//   } catch (err) {
//     // Handle Mongoose duplicate key error
//     if (err.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         status: "error",
//         message: "Email already exists",
//         data: null,
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       status: "error",
//       message: err.message ?? "Something went wrong",
//       data: null,
//     });
//   }
// });
// Route to create a new user
app.post("/users", async (req, res) => {
  try {
    const body = req.body;
    const user = await User.create(body);

    return res.status(201).json({
      success: true,
      status: "success",
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        status: "error",
        message: "Email already exists.",
        data: null,
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      status: "error",
      message: err.message || "Something went wrong",
      data: null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Sever started at port: http://localhost:${PORT}`);
});
