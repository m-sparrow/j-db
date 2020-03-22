const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/base-router.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to j-db! Hackable NoSQL DB!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/jdb', router);

app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});
