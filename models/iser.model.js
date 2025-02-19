const mongoose = require("mongoose");
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

module.exports = User;
