const express = require("express");
const path = require("path");
const router = require("./routes");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const uri = process.env.MONGODB_URI;

mongoose.connect(uri || "mongodb://localhost:27017/mtla", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

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
