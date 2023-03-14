const express = require("express");
const User = require("../models/User");
const Collection = require("../models/Collection_new");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SDiubi34b5bui23b4hjb534kjhb45645kj765hjkb345jh";
const Todos = require("../models/Todo_new");

Router.post("/signup", async (request, response) => {
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

    response.status(200).send({ user: "created", status: 200 });
  } catch (error) {
    response.status(400).send({ error: error, status: 400 });
  }
});

Router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (!user) {
    return response.json({ error: "User does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id.valueOf() }, JWT_SECRET);

    if (response.status(200)) {
      return response.json({ status: "ok", data: token });
    } else {
      return response.json({ error: "error" });
    }
  }
  response.json({ status: "error", error: "Invalid password" });
});

Router.post("/collection", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);

  const { collectionName } = request.body;
  const collectionNameClean = collectionName.trim();

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!collectionNameClean) {
    return response
      .status(422)
      .json({ error: "Please fill in collection name" });
  }

  try {
    await Collection.create({
      folder_name: collectionNameClean,
      user_id: userId,
    });
    response.status(200).send({ status: "ok" });
  } catch (error) {
    response.status(400).send(error);
  }
});

Router.get("/collections", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  try {
    let collections = await Collection.find({ user_id: userId });
    response.status(200).send({ status: "ok", data: collections });
  } catch (error) {
    response.status(400).send(error);
  }
});

Router.post("/collection/remove", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);
  const folderId = request.body.folderId;

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!folderId) {
    return response.status(422).json({ error: "folder id" });
  }

  try {
    await Collection.deleteOne({ _id: folderId });
    response.status(200).send({ status: "ok" });
  } catch (error) {
    response.status(400).send(error);
  }
});

Router.post("/collection/edit", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);
  const folderId = request.body.folderId
  const newCollection = request.body.newCollection

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!folderId) {
    return response.status(422).json({ error: "missing folder id" });
  }

  if (!newCollection) {
    return response.status(422).json({ error: "enter new collection name"});
  }

  try {
    await Collection.findOneAndUpdate({ _id: folderId }, { folder_name: newCollection } );
    response.status(200).send({ status: "ok" });
  } catch (error) {
    response.status(400).send(error);
  }

});

Router.get("/home/:projectsId", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);
  const folderId = request.params["projectsId"];

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!folderId) {
    return response.status(422).json({ error: "folder id" });
  }

  try {
    let todos = await Todos.find({ folder_id: folderId });
    let collection = await Collection.findOne({ _id: folderId });
    let collectionName = collection.folder_name;

    response
      .status(200)
      .send({ status: "ok", todos: todos, collectionName: collectionName });
  } catch (error) {
    response.status(400).send(error);
  }
});

Router.post("/home/:projectsId", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);
  const folderId = request.params["projectsId"];

  const { todo } = request.body;

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!todo) {
    return response.status(422).json({ error: "Please fill in todo name" });
  }

  try {
    await Todos.create({
      todo: todo,
      user_id: userId,
      folder_id: folderId,
    });
    response.status(200).send({ status: "ok" });
  } catch (error) {
    response.status(400).send(error);
  }
});

Router.get("/home/remove/:todoId", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);
  const todoId = request.params["todoId"];

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!todoId) {
    return response.status(422).json({ error: "user id" });
  }

  try {
    await Todos.deleteOne({ _id: todoId });
    response.status(200).send({ status: "ok" });
  } catch (error) {
    response.status(400).send(error);
  }
});


Router.post("/home/edit/:todoId", async (request, response) => {
  const token = request.headers.authorization;
  const { userId } = jwt.verify(token, JWT_SECRET);
  const todoId = request.params["todoId"];
  const newTodo = request.body.newTodo

  if (!userId) {
    return response.status(422).json({ error: "user id" });
  }

  if (!todoId) {
    return response.status(422).json({ error: "missing todo id" });
  }

  if (!newTodo) {
    return response.status(422).json({ error: "enter new todo name"});
  }

  try {
    await Todos.findOneAndUpdate({ _id: todoId }, {todo: newTodo } );
    response.status(200).send({ status: "ok" });
  } catch (error) {
    response.status(400).send(error);
  }

});


module.exports = Router;
