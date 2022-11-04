const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
require("./models/User")
const User = mongoose.model("NewUser")

app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log("mongoDB not connected");
    console.log(err);
});

app.post("/sign-up", async (request, response) => {
  const [fname, lname, email, password] = request.body;
  try {
    const oldUser = User.findOne({ email });

    if (oldUser){
      response.send({ error: "User Exists"})
    }
    await User.create({
      fname,
      lname,
      email,
      password,
    });
    response.send({status:"ok"})
  } catch (error){
    response.send({status:"error"})
  }
})

app.listen(8000, () => {
  console.log("Server running on port 8000");
});