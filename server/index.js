const express = require("express");
const { mongo } = require("mongoose");
const path = require("path");
const db = require("./db/index.js");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

app.post("/users", (req, res) => {
  const data = req.body;
  mongo.addUser(data);
  res.send("User Created!");
});

// * * * * * * * * Server Connection * * * * * * * *
app.listen(1703, () => {
  console.log("Sharpening the axe...");
});
