const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Router = require("./routes/routes");
app.use(express.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Content-Type, Authorization"
  );
  next();
});  

dotenv.config();

mongoose
  .connect(process.env.DATABASE_ACCESS, {
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

app.use("/", Router);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
