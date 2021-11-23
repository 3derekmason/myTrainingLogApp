const express = require('express');

const db = require('../db')

const pool = require('../db/queries');

//const Router = require('./routes.js');

const app = express();

app.use(express.json());

//app.use(Router);

app.get('/', (err, res) => {
  if (err) {console.log('U Idiot')}
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.listen(1703, () => {
  console.log('Sharpening the axe...')
});