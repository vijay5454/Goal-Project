const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User/UserModel");

const protectUserRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //Verify given token
      const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedValue.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized!");
    }
  }
  if (!token) {
    throw new Error("Not authorized, no token found!");
  }
});

module.exports = {
  protectUserRoute,
};
