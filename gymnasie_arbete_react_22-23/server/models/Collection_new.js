const mongoose = require("mongoose");

const todo_collection = new mongoose.Schema({
  folder_name: {type: String, required: true},
  user_id: { type: String, required: true },
  folder_id: { type: String, default: Date.now, required: true }
});

const Collection = mongoose.model("Collection", todo_collection);
module.exports = Collection;