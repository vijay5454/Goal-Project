const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/UserController");
const { protectUserRoute } = require("../middlewares/authMiddleware");

const express = require("express");

const UserRouter = express.Router();

UserRouter.post("/", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/me", protectUserRoute, getMe);

module.exports = UserRouter;
