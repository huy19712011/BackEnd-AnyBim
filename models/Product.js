// const jwt = require('jsonwebtoken');
// const config = require('config');
const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');
// const Joi = require('joi');
const Joi = require('@hapi/joi');


const productSchema = {
  // id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT },
};


class Product extends Model {
  // generateAuthToken = function () {
  //   const token = jwt.sign({email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  //   return token;
  // }
}

Product.init(productSchema, {sequelize, modelName: 'product'});

// create table in database
// Product.sync({force: true}); // delete if exists and create new
Product.sync({force: false}); // create if not exists

// Add some rows on table, use once for init...
// Product.create({ 
//   // id: 1,
//   name: "name 1",
//   title: 'title 1',
//   imageUrl: 'http://angular.io/assets/images/logos/angular/angular.png',
//   description: 'description 1',
//   content: 'content 1',
// });


function validateProduct(product) {
  /**
    schema should be exactly the same as fields in table Product in order to work with PUT on Frontend !!!
  **/
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    title: Joi.string(),
    imageUrl: Joi.string(),
    description: Joi.string(),
    content: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  
  return schema.validate(product);
}


module.exports.Product = Product;
module.exports.validateProduct = validateProduct;