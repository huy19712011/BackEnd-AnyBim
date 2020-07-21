const winston = require('winston');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const { json } = require('body-parser');
const startupDebuger = require('debug')('app:startup');
const dbDebuger = require('debug')('app:db');


const app = express();

require('./startup/routes')(app);


// console.log("This is only for test");
// logger.add(new winston.transports.Console({message: 'This only for test 123'}))

/**
  we can use 2 these events to handle error
**/
// process.on('uncaughtException', (ex) => {
//   console.log('WE GOT UNCAUGHT EXCEPTION');
//   logger123.error('Error: ', ex);
//   process.exit(1);
// });

// process.on('unhandledRejection', (ex) => {
//   console.log('WE GOT UNHANDLED REJECTION');
//   logger123.error('Error: ', ex);
//   process.exit(1);
// });


/**
 Adding this only for test error handling
**/
// throw new Error('Something failed during startup');
// const p = Promise.reject(new Error('Something failed miserably'));
// p.then(() => console.log('done'));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.set('view engine', 'pug');
app.set('views', './views'); // default

const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:4000', 'http://localhost:8000']
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log('Morgan enable...');
  startupDebuger('Morgan enable...');
}

// Configuration
// console.log('Application name: ', config.get('name'));
// console.log('Mail Server: ', config.get('mail.host'));
// console.log('Mail Password: ', config.get('mail.password'));

// app.use(logger);

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.get('/pug', (req, res) => {
  res.render('index', {title: 'Using Pug', message: 'message using Pug'});
});


app.listen(8000, () => {
  console.log('Server is started ...');
});



