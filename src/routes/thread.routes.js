const router = require("express").Router();
const joi = require("joi");
const validator = require("express-joi-validation").createValidator();

const threadsController = require("../controllers/thread.controller");
const jwtVerify = require("../middlewares/jwtVerify");

const threadSchema = joi.object({
  title: joi.string().min(3).max(50).required(),
  desc: joi.string().min(10).max(1000).required(),
  tags: joi.array().required(),
  topic: joi.string().max(15).required(),
});

router.get("/", threadsController.getAllThreads);

router.get("/userThreads", jwtVerify, threadsController.getUserThreads);

router.get("/topic/:_id", threadsController.getTopicThreads);

router.post(
  "/create",
  jwtVerify,
  validator.body(threadSchema),
  threadsController.createThread
);

router.post("/tags", threadsController.getTagsThreads);

module.exports = router;
