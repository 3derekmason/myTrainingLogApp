const express = require("express");
const path = require("path");
const router = require("./routes");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

// Set up routes

app.use("/api/", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

const PORT = process.env.PORT || 1703;
// * * * * * * * * Server Connection * * * * * * * *
app.listen(PORT, () => {
  console.log("Sharpening the axe...");
});
