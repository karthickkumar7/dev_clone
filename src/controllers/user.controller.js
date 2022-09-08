const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @get all users GET /auth/users/
const getAllUsers = asynchandler(async (req, res) => {
  const allUsers = await User.find({}).select("-password").lean().exec();
  return res.status(200).json({ msg: "success!", user: allUsers });
});

// @register POST /auth/users/register
const register = asynchandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  const existingUser = await User.findOne({ username }).lean().exec();
  if (existingUser)
    return res.status(409).json({ msg: "User already exists!" });

  const createdUser = await User.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    isAdmin,
  });

  const access = jwt.sign(
    { username, email, _id: createdUser._id },
    process.env.ACCESS,
    { expiresIn: "1d" }
  );

  return res
    .status(200)
    .json({ msg: "success!", user: createdUser, token: access });
});

// @login POST /auth/users/login
const login = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ username }).lean().exec();
  if (!existingUser)
    return res.status(400).json({ msg: "Incorrect username/password!" });

  if (!(await bcrypt.compare(password, existingUser.password)))
    return res.status(400).json({ msg: "Incorrect username/password!" });

  const access = jwt.sign(
    { username, email, _id: existingUser._id },
    process.env.ACCESS,
    { expiresIn: "1d" }
  );

  return res
    .status(200)
    .json({ msg: "success!", user: existingUser, token: access });
});

// @update PUT /auth/users/update
const update = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  const _id = req.user._id;

  await User.findOneAndUpdate({ _id }, { $set: { username, email } })
    .lean()
    .exec();

  return res.status(200).json({ msg: "success!" });
});

module.exports = {
  getAllUsers,
  register,
  login,
  update,
};
