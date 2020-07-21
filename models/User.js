const jwt = require('jsonwebtoken');
const config = require('config');
const { DataTypes, Model, Sequelize } = require('sequelize');

const sequelize = require('../sequelize');
const Joi = require('joi');


const userSchema = {
  name: { 
    type: DataTypes.STRING,
    require: true,
    minlength: 2,
    maxlength: 30,
    defaultValue: 'testName',
  },
  email: { 
    defaultValue: 'test@gmail.com',
    type: DataTypes.STRING,
    minlength: 5,
    maxlength: 255,
    // unique: true, // not working! adding some code to work properly, see "check unique for email in users.js"
  },
  password: { 
    type: DataTypes.STRING,
    require: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    // alowNull: true,
  },
  /**
    if add function here, it will add this column in database table with name of function name
  **/
  // generateAuthToken: {
  //   type: DataTypes.STRING,
  //   defaultValue: function () {
  //     const token = jwt.sign({email: this.email}, config.get('jwtPrivateKey'));
  //     return token;
  //   }
  // },
};

/**
 Add generateAuthtoken() to class User.
**/
class User extends Model {
  generateAuthToken = function () {
      const token = jwt.sign({email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
      return token;
    }
}
User.init(userSchema, {sequelize, modelName: 'user'});

// create table in database
// User.sync({force: true}); // delete if exists and create new
User.sync({force: false}); // create if not exists

// Add some rows on table
// User.sync({force: true}).then(() => {
//   // const one = User.build({ name: "One", email: 'One@gmail.com', password: '123456'});
//   // one.save();

//   User.create({ name: "One", email: 'One@gmail.com', password: '123456'});
//   User.create({ name: "Two", email: 'Two@gmail.com', password: '123456'});
//   // console.log('table created in database');
// });

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // email: Joi.string().min(5).max(255).email().default('test@gmail.com'), // default() not working here!
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
    isAdmin: Joi.boolean(),
  });
  
  return schema.validate(user);
}



module.exports = User;
module.exports.validateUser = validateUser;