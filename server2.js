const express = require('express');
const cors = require('cors');
const sql = require('./sql');

const app = express();

const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:4000']
}

app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log('Server is started...');
  sql.init();
});

app.get('/', function (req, res) {
  res.send('Hello node.js');
});

require('./articles2')(app, sql);
