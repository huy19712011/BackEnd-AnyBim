const winston = require('winston');

const logger = winston.createLogger({
  level: 'warn',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', handleExceptions: true}),
    new winston.transports.Console({handleExceptions: true}),
  ],
  // exceptionHandlers: [
  //   new winston.transports.File({filename: 'unHandledException.log'})
  // ],
  // rejectionHandlers can work as exceptionHandlers => not need above lines of code
  rejectionHandlers: [
    new winston.transports.File({ filename: 'unHandledRejection.log' }) 
  ],
  // exitOnError: false, // true by default
});

module.exports = logger;