const mongoose = require("mongoose");

function connectDatabase(DB_URI) {
  mongoose
    .connect(DB_URI)
    .then((err, res) => {
      console.log("data base connected");
    })
    .catch((err) => {
      console.log("database cannot connected ", err);
    });
}

module.exports = connectDatabase;
