const express = require("express");
const Users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// to parse req.body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json())

app.use((req, res, next) => {
  console.log("middleware 1");

  req.user = "User 1";

  //    return res.end('Ended by middleware 1')

  next();
});

app.use((req, res, next) => {
  console.log("middleware 2");

  console.log(req.user);

  next("Error");
});

// get all users
app.get("/users", (req, res) => {
  return res.status(200).json(Users);
});

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

app
  .route("/users/:id")
  .get((req, res) => {
    console.log(req.params.id);

    const userId = Number(req.params.id);

    const user = Users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);

    const body = req.body;

    const userIndex = Users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found.",
      });
    }

    const user = Users[userIndex];

    const updatedUser = {
      ...user,
      ...body,
    };

    Users[userIndex] = updatedUser;

    fs.writeFile("MOCK_DATA.json", JSON.stringify(Users), (err, data) => {
      return res.status(201).json({
        status: "success",
        message: "User updated",
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const index = Users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found.",
      });
    }

    Users.splice(index, 1);

    fs.writeFile("MOCK_DATA.json", JSON.stringify(Users), () => {
      return res.status(200).json({
        status: "Success",
        message: "User Deleted.",
      });
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
