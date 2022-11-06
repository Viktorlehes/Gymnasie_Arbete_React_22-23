const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User")
const bcrypt = require("bcryptjs")

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
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
  const { fname, lname, email, password } = request.body;
  if (!fname || !lname || !email || !password) {
    return response.status(422).json({ error: "Please fill your details" });
  }
  try {

    const userExist = await User.findOne({ email });

    if (userExist){
      return response.status(422).send({ error: "User Exists"})
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({fname, lname,email,password: encryptedPassword,});

    response.status(200).send({user: "created"})
  } catch (error) {
    response.status(400).send(error)
  }
})

app.listen(8000, () => {
  console.log("Server running on port 8000");
});