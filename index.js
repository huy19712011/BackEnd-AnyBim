// const sequelize = require('./sequelize');
// const winston = require('winston');
// require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const { json } = require('body-parser');
const logger = require('./startup/logger');
const startupDebuger = require('debug')('app:startup');
const dbDebuger = require('debug')('app:db');


const app = express();
// const corsOptions = {
//   origin: ['http://localhost:4200', 'http://localhost:4000', 'http://localhost:8000']
// }
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(helmet());

const upload = require('express-fileupload');
app.use(upload());



require('./startup/routes')(app);
require('./startup/config')();

// require('./routes/upload')(app);

/**
 Adding this only for test error handling
**/
// throw new Error('Something failed during startup');
// const p = Promise.reject(new Error('Something failed miserably'));
// p.then(() => console.log('done'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log('Morgan enable...');
  startupDebuger('Morgan enable...');
}

// const port = process.env.PORT || config.get('port');
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // console.log('Server is started ...');
  logger.info(`Server is started at PORT: ${port}`);
});



