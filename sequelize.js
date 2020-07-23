const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('ngblog', 'root', '123456', {
  host: 'localhost',
  dialect: 'mariadb',
  port: 3306,
  dialectOptions: {
    timezone: process.env.db_timezone
  },
  // logging: (...msg) => console.log(msg),
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } 
  catch (err) {
    console.log('Error: ', err);
  }
})();




module.exports = sequelize;