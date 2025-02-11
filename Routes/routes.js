const express = require("express");
const {
  createUser,
  updateUser,
  loginUser,
  getUser,
  deleteUser
} = require("../Controllers/controller");
const authenticateUser = require("../Middleware/middleware");

const userRouter = express.Router();

userRouter.post("/signup", createUser);

userRouter.put("/update/:id",authenticateUser, updateUser);

userRouter.get("/get/:id",authenticateUser, getUser);

userRouter.post("/login", loginUser);

userRouter.delete("/delete/:id",authenticateUser, deleteUser);

module.exports = userRouter;