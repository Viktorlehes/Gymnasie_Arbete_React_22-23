const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {type: String, unique: true},
    password: String,
  },
  {
    collection: "Userinfo",
  }
);

mongoose.model("NewUser", User);