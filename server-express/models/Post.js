const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  complete: { type: Boolean, default: false },
  dateCompleted: { type: Date }});

module.exports = mongoose.model("Post", PostSchema);