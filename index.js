const express = require("express");
// const Users = require("./MOCK_DATA.json");
// const fs = require("fs");
const mongoose = require("mongoose");
const DB_URI = "mongodb://127.0.0.1:27017/crud-users";

const app = express();
const PORT = 8000;

const User = mongoose.model("user", userSchema);

// to parse req.body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      status: "success",
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: "error",
      message: error.message ?? "Something went wrong",
      data: null,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const user = await User.create(body);

    console.log("new user", user);

    return res.status(201).json({
      success: true,
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: "error",
      message: error.message ?? "Something went wrong",
      data: null,
    });
  }
});

app
  .route("/users/:id")
  .get(async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: "Not found",
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        status: "success",
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "error",
        message: error.message ?? "Something went wrong",
        data: null,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const id = req.params.id;

      const body = req.body;
      console.log(body);
      const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

      if (!updatedUser) {
        return res.status(404).json({
          status: "Fail",
          message: "User not found.",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "User updated",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "error",
        message: error.message ?? "Something went wrong",
        data: null,
      });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    return res.status(200).json({
      status: "Success",
      message: "User Deleted.",
    });
  });

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
