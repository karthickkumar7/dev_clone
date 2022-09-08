const router = require("express").Router();
const joi = require("joi");
const validator = require("express-joi-validation").createValidator();

const usersController = require("../controllers/user.controller");
const jwtVerify = require("../middlewares/jwtVerify");

const registerSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(25).required(),
  isAdmin: joi.boolean(),
});

const loginSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(3).max(25).required(),
  email: joi.string().email(),
});

const updateSchema = joi.object({
  username: joi.string().min(3).max(20).optional(),
  email: joi.string().email().optional(),
  password: joi.string().min(3).max(25).optional(),
});

router.get("/", usersController.getAllUsers);

router.post(
  "/register",
  validator.body(registerSchema),
  usersController.register
);

router.post("/login", validator.body(loginSchema), usersController.login);

router.put(
  "/update",
  jwtVerify,
  validator.body(updateSchema),
  usersController.update
);

module.exports = router;
