require('express-async-errors');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', handleExceptions: true, level: 'error'}),
    new winston.transports.File({ filename: 'info.log', handleExceptions: true}), // level = info
    new winston.transports.Console({handleExceptions: true, colorize: true, prettyPrint: true}), // level = info
  ],
  // exceptionHandlers: [
  //   new winston.transports.File({filename: 'unHandledException.log'})
  // ],
  // rejectionHandlers can work as exceptionHandlers => not need above lines of code
  rejectionHandlers: [
    new winston.transports.File({ filename: 'unHandledRejection.log', level: 'error' }) 
  ],
  // exitOnError: false, // true by default
});

module.exports = logger;


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
