const express = require('express');

const db = require('../db')

//const Router = require('./routes.js');

const app = express();

app.use(express.json());

//app.use(Router);

app.get('/', (err, res) => {
  if (err) {console.log('U Idiot')}

  const workout = db.collection('woodPile');

  workout.find({}).toArray((e, data) => {
    if (e) throw e;
    res.json(data);
  })
})

app.listen(1703, () => {
  console.log('Sharpening the axe...')
});