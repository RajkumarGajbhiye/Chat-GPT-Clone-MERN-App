const User = require("../models/userModel.js");
const ApplicationError = require("../utils/ApplicationError");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const { authTokenCreation } = require("../utils/jwtTokenProcess.js");

//register
const registerUser = catchErrorAsync(async (req,res,next) => {
  const { username, email, password } = req.body;

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return next(new ApplicationError("Email is already register", 500));
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    status: "successful Sign up",
    user,
  });
});

//login:
const loginUser = catchErrorAsync(async (req,res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApplicationError("Please provide email or password"));
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new ApplicationError("Invalid credential", 401));
  }

  //create token
  const token = authTokenCreation(user._id);

  res.status(200).json({
    status: "successful login",
    token,
  });
});

//logout
const logoutUser = async () => {};
module.exports = { registerUser, loginUser, logoutUser };
