import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Book", bookSchema);
