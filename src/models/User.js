const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    active: {
      type: Boolean,
      default: true,
    },
    role: [
      {
        type: String,
        default: "Employee",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
