const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User/UserModel");

// @desc Register User
// @Route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("Invalid request");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Invalid request User Already Exists!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    throw new Error("Cannot able to create user");
  }
});

// @desc Login User
// @Route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //Finding the user with email
  const user = await User.findOne({ email });

  //Check and compare the entered and db password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

// @desc Display User data
// @Route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Used to Generate Json-Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
