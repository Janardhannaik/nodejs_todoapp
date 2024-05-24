import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  title: {
    type: String,
    unique: true,
    required: true,
  },

  description: {
    type: String,
    select: false,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export const Task = mongoose.model("Task", schema);
