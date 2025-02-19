// //? get all users by id
// // app.get("/users/:id", (req, res) => {
// //   const userId = Number(req.params.id);
// //   const user = user1.find((user) => user.id == userId);
// //   return res.json(user);
// // });

// // app.get("/", (req, res) => {
// //   return res.send("hello i from home");
// // });

// // app.get("/about", (req, res) => {
// //   return res.send("About page");
// // });

// app.listen(port, () => {
//   console.log(`Sever started at port: http://localhost:${port}`);
// });

const express = require("express");
const Users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const DB_URI = "mongodb://127.0.0.1:27017/crud-users";

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
    required: [true, "Name is required"],
    unique: [true, "this email is already exist"],
  },
  age: {
    type: Number,
    required: false,
  },
});
const User = mongoose.model("user", UserSchema);

const app = express();
const PORT = 8000;

// to parse req.body
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("middliware 1");
  req.user = "user 1";
  // return res.end("ended by one");
  next();
});
app.use((req, res, next) => {
  console.log("middliware 2");
  console.log(req.user);
  next("Error"); //this can directly call the error halder
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "Error",
    message: err.message || "something erong",
  });
});
// get all users
app.get("/users", (req, res) => {
  return res.status(200).json(Users);
});

// get user by id
// app.get('/users/:id',(req,res)=>{
//     console.log(req.params.id)

//     const userId = Number(req.params.id)

//     const user = Users.find((user) => user.id === userId)

//     return res.json(user)

// })

app.post("/users", (req, res) => {
  const body = req.body;
  console.log(body);

  Users.push({ ...body, id: Users.length + 1 });

  fs.writeFile("MOCK_DATA.json", JSON.stringify(Users), (err, data) => {
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      id: Users.length,
    });
  });
});

// app.patch("/users/:id", (req, res) => {
//   res.json({
//     status: "pending",
//   });
// });

// app.delete("/users/:id", (req, res) => {
//   res.json({
//     status: "pending",
//   });
// });

app
  .route("/users/:id")
  .get((req, res) => {
    console.log(req.params.id);

    const userId = Number(req.params.id);

    const user = Users.find((user) => user.id === userId);

    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = Users.findIndex((user) => user.id === id);
    if (!Users) {
      return res.json({
        status: "fail",
        message: "User not found",
      });
    }
    if (userIndex === -1) {
      return res.json({
        status: "fail",
        message: "User not found",
      });
    }
    const user = Users[userIndex];
    const updateUser = {
      ...user,
      ...body,
    };
    Users[userIndex] = updateUser;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(Users), (err, data) => {
      return res.json({
        status: "sucess",
        message: "user updated",
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = Users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.json({
        status: "fail",
        message: "User not found",
      });
    }

    Users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(Users), (err) => {
      if (err) {
        return res.status(201).json({
          status: "error",
          message: "Failed to update user data",
        });
      }

      return res.json({
        status: "success",
        message: "User deleted ",
      });
    });
    // return res.json({
    //   status: "pending",
    // });
  });

app.listen(PORT, () => {
  console.log(`Sever started at port: http://localhost:${PORT}`);
});
