const express = require("express");
const path = require("path");

const logUsers = require("../db/userIndex");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

/*
 * * * * * * * * REQUESTS TO logusers : users * * * * * * * *
 */
app.post("/users", (req, res) => {
  const query =
    "INSERT INTO users (username, email, date_joined) VALUES ($1, $2, $3)";
  const username = req.body.username;
  const email = req.body.email;
  const date_joined = new Date();
  logUsers.query(query, [username, email, date_joined], (err, results) => {
    if (err) console.log(err);
    res.status(201).send(`User,${username} given an axe`);
  });
});
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  logUsers.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.rows);
  });
});
/*
 * * * * * * * * REQUESTS TO logusers : core_library * * * * * * * *
 */
app.post("/library/core", (req, res) => {
  const query =
    "INSERT INTO core_library (exercise, equipment, added_by) VALUES ($1, $2, $3)";
  const exercise = req.body.exercise.toLowerCase();
  const equipment = req.body.equipment.toLowerCase();
  const addedBy = Number(req.body.added_by);
  logUsers.query(query, [exercise, equipment, addedBy], (err, results) => {
    if (err) console.log(err);
    res
      .status(201)
      .send(`Exercise, ${exercise} thown on the core_library pile...`);
  });
});
app.get("/library/core", (req, res) => {
  const query = "SELECT * FROM core_library";
  logUsers.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.rows);
  });
});
/*
 * * * * * * * * REQUESTS TO logusers : push_library * * * * * * * *
 */
app.post("/library/push", (req, res) => {
  const query =
    "INSERT INTO push_library (exercise, area, is_primary, added_by) VALUES ($1, $2, $3, $4)";
  const exercise = req.body.exercise.toLowerCase();
  const area = req.body.area.toLowerCase();
  const isPrimary = req.body.isPrimary;
  const added_by = Number(req.body.added_by);
  logUsers.query(
    query,
    [exercise, area, isPrimary, added_by],
    (err, results) => {
      if (err) console.log(err);
      res
        .status(201)
        .send(`Exercise, ${exercise} thown on the push_library pile...`);
    }
  );
});
app.get("/library/push", (req, res) => {
  const query = "SELECT * FROM push_library";
  logUsers.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.rows);
  });
});
/*
 * * * * * * * * REQUESTS TO logusers : pull_library * * * * * * * *
 */
app.post("/library/pull", (req, res) => {
  const query =
    "INSERT INTO pull_library (exercise, area, is_primary, added_by) VALUES ($1, $2, $3, $4)";
  const exercise = req.body.exercise.toLowerCase();
  const area = req.body.area.toLowerCase();
  const isPrimary = req.body.isPrimary;
  const added_by = Number(req.body.added_by);
  logUsers.query(
    query,
    [exercise, area, isPrimary, added_by],
    (err, results) => {
      if (err) console.log(err);
      res
        .status(201)
        .send(`Exercise, ${exercise} thown on the pull_library pile...`);
    }
  );
});
app.get("/library/pull", (req, res) => {
  const query = "SELECT * FROM pull_library";
  logUsers.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.rows);
  });
});

/*
 * * * * * * * * REQUESTS TO woodshed : woodPile * * * * * * * *
 */

// * * * * * * * * Server Connection * * * * * * * *
app.listen(1703, () => {
  console.log("Sharpening the axe...");
});
