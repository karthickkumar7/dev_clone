const { Schema, model, Types } = require("mongoose");

const threadSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    topic: String,
    tags: {
      type: Array,
    },
    title: String,
    desc: String,
    liikes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Thread", threadSchema);
