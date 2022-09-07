const { Schema, model, Types, default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    title: String,
    text: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 1,
});

module.exports = model("Note", noteSchema);
