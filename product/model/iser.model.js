const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Productname: {
    type: String,
    // if name doesn't enter then it can throught the error
    required: [true, "Name is required"],
    trim: true,
  },
  prductCategory: {
    type: String,
    // unique: true,
    required: [true, "email is required"],
  },
  productCode: {
    type: Number,
    required: false,
    // unique: true,
    unique: [true, "product code must be unique"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
