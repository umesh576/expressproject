const User = require("../models/iser.model.js");

exports.getAllUser = () => {
  async (req, res) => {
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
  };
};

exports.createUser = () => {
  async (req, res) => {
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
  };
};

exports.getuserById = () => {
  async (req, res) => {
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
  };
};

exports.updateUser = () => {
  async (req, res) => {
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
  };
};

exports.deleteUser = () => {
  async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    return res.status(200).json({
      status: "Success",
      message: "User Deleted.",
    });
  };
};
