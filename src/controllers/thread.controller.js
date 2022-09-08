const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Thread = require("../models/Thread");

// @GET get all threads
const getAllThreads = asyncHandler(async (req, res) => {
  const allThreads = await Thread.find({}).lean().sort({ createdAt: 1 }).exec();
  return res.status(200).json({ msg: "success!", threads: allThreads });
});

// @GET get user threads
const getUserThreads = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const allUserThreads = await Thread.find({ user: _id }).lean().exec();
  return res.status(200).json({ msg: "success!", threads: allUserThreads });
});

// @GET get topic threads
const getTopicThreads = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const topicThreads = await Thread.find({ topic: _id }).lean().exec();
  return res.status(200).json({ msg: "success!", threads: topicThreads });
});
// @GET get tags threads
const getTagsThreads = asyncHandler(async (req, res) => {
  const { tagsArray } = req.body;
  const tagsThreads = await Thread.find({ tags: { $in: tagsArray } })
    .lean()
    .exec();
  return res.status(200).json({ msg: "success!", threads: tagsThreads });
});

// @POST create thread
const createThread = asyncHandler(async (req, res) => {
  const { title, desc, tags, topic } = req.body;
  const _id = req.user._id;

  const createdThread = await Thread.create({
    title,
    desc,
    tags,
    topic,
    user: _id,
  });

  return res.status(201).json({ msg: "success!", thread: createdThread });
});

// @PUT update thread

// @DELETE delete thread

module.exports = {
  getAllThreads,
  getUserThreads,
  createThread,
  getTopicThreads,
  getTagsThreads,
};
