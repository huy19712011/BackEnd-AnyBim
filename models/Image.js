// const jwt = require('jsonwebtoken');
// const config = require('config');
const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');
// const Joi = require('joi');
const Joi = require('@hapi/joi');


const imageSchema = {
  type: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
};


class Image extends Model {
  // generateAuthToken = function () {
  //   const token = jwt.sign({email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  //   return token;
  // }
}

Image.init(imageSchema, {sequelize, modelName: 'image'});

// create table in database
// Image.sync({force: true}); // delete if exists and create new
Image.sync({force: false}); // create if not exists

// // Add some rows on table, use once for init...
// Article.create({ 
//   title: 'My first article',
//   key: 'my-first-article',
//   date: Date.now(),
//   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim.',
//   description: 'This is my first article! It is great. Please read it. :)',
//   imageUrl: 'http://angular.io/assets/images/logos/angular/angular.png',
//   viewCount: 1,
//   published: true,
// });
// Article.create({ 
//   title: 'article 2',
//   key: 'article 2',
//   date: Date.now(),
//   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet viverra erat at laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae tempus enim.',
//   description: 'This is article 2!',
//   imageUrl: 'http://angular.io/assets/images/logos/angular/angular_solidBlack.png',
//   viewCount: 1,
//   published: true,
// });


function validateImage(image) {
  /**
    schema should be exactly the same as fields in table Image in order to work with PUT on Frontend !!!
  **/
  const schema = Joi.object({
    id: Joi.number(),
    type: Joi.string(),
    name: Joi.string(),
    imageUrl: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  
  return schema.validate(image);
}


module.exports.Image = Image;
module.exports.validateImage = validateImage;