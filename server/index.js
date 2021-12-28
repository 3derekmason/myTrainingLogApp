const express = require("express");
const path = require("path");
const db = require("./db/index.js");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

// * * * * * * * * Server Connection * * * * * * * *
app.listen(1703, () => {
  console.log("Sharpening the axe...");
});
