import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export const User = mongoose.model("User", schema);
