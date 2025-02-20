// const router = require("Router");
const express = require("express");
// const User = require("../model/iser.model.js");
// const User = require("../model/iser.model.js");
const router = express.Router();
const {
  getAllUser,
  createUser,
  getuserById,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

router.get("/", getAllUser /* async (req, res) => {}*/);

router.post("/", createUser);

router.get("/id:", getuserById);

router.patch("/:id"), updateUser;

router.delete("/:id", deleteUser);

module.exports = router;
