const router = require("express").Router();
const joi = require("joi");
const validator = require("express-joi-validation").createValidator();

const userSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(3).max(25).required(),
});

router.route("/").get().post().put().delete();

module.exports = router;
