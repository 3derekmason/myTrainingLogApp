const express = require('express');

const db = require('../db')
const logUsers = require('../db/userIndex');

const app = express();
app.use(express.json());

/*
 * * * * * * * * REQUESTS TO logusers : users * * * * * * * *
*/
app.post('/users', (req, res) => {
  const query = 'INSERT INTO users (username, email, date_joined) VALUES ($1, $2, $3)';
  const username = req.body.username;
  const email = req.body.email;
  const date_joined = new Date();
  logUsers.query(query, [username, email, date_joined], (err, results) => {
    if (err) console.log(err);
    res.status(201).send(`User,${username} given an axe`);
  })
})
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  logUsers.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.rows);
  })
})
/*
 * * * * * * * * REQUESTS TO logusers : core_library * * * * * * * *
*/
app.post('/library/core', (req, res) => {
  const query = 'INSERT INTO core_library (exercise, equipment) VALUES ($1, $2)';
  const exercise = req.body.exercise;
  const equipment = req.body.equipment;
  logUsers.query(query, [exercise, equipment], (err, results) => {
    if (err) console.log(err);
    res.status(201).send(`Exercise, ${exercise} thown on the core_library pile...`);
  })
})
app.get('/library/core', (req, res) => {
  const query = 'SELECT * FROM core_library';
  logUsers.query(query, (err, data) => {
    if (err) console.log(err);
    res.status(200).json(data.rows);
  })
})

/*
 * * * * * * * * REQUESTS TO logusers : push_library * * * * * * * *
*/


/*
 * * * * * * * * REQUESTS TO logusers : pull_library * * * * * * * *
*/



// * * * * * * * * Server Connection * * * * * * * *
app.listen(1703, () => {
  console.log('Sharpening the axe...')
});