const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User")
const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SDiubi34b5bui23b4hjb534kjhb45645kj765hjkb345jh"

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

    if (userExist) {
      return response.status(422).send({ error: "User Exists" })
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({ fname, lname, email, password: encryptedPassword, });

    response.status(200).send({ user: "created" })
  } catch (error) {
    response.status(400).send(error)
  }
})

app.post("/sign-in", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  if (!user) {
    return response.json({ error: "User does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email: user.email}, JWT_SECRET);

    if (response.status(201)) {
      return response.json({ status: "ok", data: token })
    } else {
      return response.json({ error: "error" });
    }
  }
  response.json({ status: "error", error: "Invalid password" });
})

app.post("/userdetails", async(request, response) => {
  const { token } = request.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);

    console.log(user);
    const useremail = user.email;
    User.findOne({ email: useremail})
    .then((data) => {
      response.send({status: "ok", data: data});
    })
    .catch((error) => {
      response.send({status:"error", data: error});
    })
  } catch (error) {}
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

