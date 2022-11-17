const express = require("express");
// const Model = require("../models/User.js");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SDiubi34b5bui23b4hjb534kjhb45645kj765hjkb345jh";



router.post("/sign-up", async (request, response) => {
  const { fname, lname, email, password } = request.body;
  if (!fname || !lname || !email || !password) {
    return response.status(422).json({ error: "Please fill your details" });
  }
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return response.status(422).send({ error: "User Exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({ fname, lname, email, password: encryptedPassword });

    response.status(200).send({ user: "created" })
    ;
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post("/sign-in", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  
  if (!user) {
    return response.json({ error: "User does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (response.status(200)) {
      return response.json({ status: "ok", data: token });
    } else {
      return response.json({ error: "error" });
    }
  }
  response.json({ status: "error", error: "Invalid password" });
});

router.post("/homepage", async (request, response) => {
  const { token } = request.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);

    console.log(user);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        response.send({ status: "ok", data: data });
      })
      .catch((error) => {
        response.send({ status: "error", data: error });
      });
  } catch (error) {}
});

module.exports = router;