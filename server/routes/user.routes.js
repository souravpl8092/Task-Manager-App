const express = require("express");
const userRouter = express.Router();
const {
  getAllUser,
  getUserById,
  removeUser,
} = require("../controllers/userController");
const loginUser = require("../controllers/loginController");
const registerUser = require("../controllers/registerController");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/").get(getAllUser);
userRouter.route("/:id").get(getUserById).delete(removeUser);

module.exports = userRouter;
