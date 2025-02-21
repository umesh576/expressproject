// const User = require("../models/iser.model.js");

const { customError } = require("../middleware/custom.error.handler");

exports.getAllUser = () => {
  async (req, res) => {
    try {
      const users = await User.find();

      return res.status(200).json({
        success: true,
        status: "success",
        data: users,
        message: "products fetched successfully",
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
        message: "Product added successfully",
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
  async (req, res, next) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        // return res.status(404).json({
        //   status: "Not found",
        //   message: "product not found",
        // });
        throw new customError("product not found", 404);
      }

      return res.status(200).json({
        success: true,
        status: "success",
        message: "product get successfully",
        data: user,
      });
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   status: "error",
      //   message: error.message ?? "Something went wrong",
      //   data: null,
      // });
      next(error);
    }
  };
};

const catchAsyncHandler = (fn) => {
  // fn();
};
exports.updateUser = () => {
  catchAsyncHandler(async (req, res, next) => {
    try {
      const id = req.params.id;

      const body = req.body;
      console.log(body);
      const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

      if (!updatedUser) {
        // return res.status(404).json({
        //   status: "Fail",
        //   message: "product not found.",
        // });
        throw new customError("product not found", 404);
      }

      return res.status(201).json({
        status: "success",
        message: "product updated",
        data: updatedUser,
      });
    } catch (error) {
      // return res.status(500).json({
      // success: false,
      // status: "error",
      // message: error.message ?? "Something went wrong",
      // data: null,
      // });
      next(error);
    }
  });
};

exports.deleteUser = () => {
  async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    return res.status(200).json({
      status: "Success",
      message: "product Deleted.",
    });
  };
};
