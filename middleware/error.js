const logger = require('../startup/logger');



// const logger = winston.createLogger({
//   level: 'error',
//   transports: [
//     new winston.transports.File({ filename: 'error.log', level: 'error'}),
//     new winston.transports.Console(),
//   ],
// });

module.exports = function(err, req, res, next) {
  // console.log('error: ', err.message);
  // logger.error(err);
  logger.error('Error: ', err);
  
  res.status(500).send('Something failed.');
};