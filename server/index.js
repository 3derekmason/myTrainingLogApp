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
 * * * * * * * * REQUESTS TO woodshed : woodPile * * * * * * * *
*/



// * * * * * * * * Server Connection * * * * * * * *
app.listen(1703, () => {
  console.log('Sharpening the axe...')
});