// const jwt = require('jsonwebtoken');
// const config = require('config');
const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');
// const Joi = require('joi');
const Joi = require('@hapi/joi');


const articleSchema = {
  // id: { type: DataTypes.INTEGER, primaryKey: true },
  title: { type: DataTypes.STRING },
  key: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATE, defaultValue: new Date()},
  content: { type: DataTypes.TEXT},
  description: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING },
  viewCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  published: { type: DataTypes.BOOLEAN, defaultValue: true },
};


class Article extends Model {
  // generateAuthToken = function () {
  //   const token = jwt.sign({email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  //   return token;
  // }
}

Article.init(articleSchema, {sequelize, modelName: 'article'});

// create table in database
// Article.sync({force: true}); // delete if exists and create new
Article.sync({force: false}); // create if not exists

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


function validateArticle(article) {
  /**
    schema should be exactly the same as fields in table Article in order to work with PUT on Frontend !!!
  **/
  const schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(2).max(255),
    key: Joi.string().min(5).max(255),
    date: Joi.date(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string(),
    viewCount: Joi.number(),
    published: Joi.boolean(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  
  return schema.validate(article);
}


module.exports.Article = Article;
module.exports.validateArticle = validateArticle;