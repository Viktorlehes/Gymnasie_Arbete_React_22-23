const mongoose = require("mongoose");

const todos = new mongoose.Schema({
  todo: { type: String, required: true },
  user_id: { type: String, required: true },
  folder_id: { type: String, required: true },
});

const Todos = mongoose.model("Todos", todos);
module.exports = Todos;
