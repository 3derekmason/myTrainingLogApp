const express = require("express");
const path = require("path");
const router = require("./routes");
const db = require("./db/index.js");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

// Set up routes

app.use("/api/", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// * * * * * * * * Server Connection * * * * * * * *
app.listen(1703, () => {
  console.log("Sharpening the axe...");
});
