const jwt = require('jsonwebtoken');
const config = require('config');
const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');
const Joi = require('joi');

/**
  1: Using Model.init()
**/
const articleSchema = {
  title: { type: DataTypes.STRING },
  key: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: Date.now() },
  content: { type: DataTypes.TEXT},
  description: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING },
  viewCount: { type: DataTypes.INTEGER, defaultValue: 0 }
};
class Article extends Model {}
Article.init(articleSchema, {sequelize, modelName: 'article'});


// create table in database
// Article.sync({force: true}); // delete if exists and create new
Article.sync({force: false}); // create if not exists



/**
  1a: Using Model.init()
**/
// class Article extends Model {}
// Article.init({
//   title: { type: Sequelize.STRING },
//   key: { type: Sequelize.STRING },
//   date: { type: Sequelize.DATE, defaultValue: Date.now() },
//   content: { type: Sequelize.TEXT},
//   description: { type: Sequelize.TEXT },
//   imageUrl: { type: Sequelize.STRING },
//   viewCount: { type: Sequelize.INTEGER, defaultValue: 0 }
// }, {sequelize, modelName: 'article'});

/**
  2: Using sequelize.define()
**/
// const Article = sequelize.define('article', {
//   title: { type: Sequelize.STRING },
//   key: { type: Sequelize.STRING },
//   date: { type: Sequelize.DATE },
//   content: { type: Sequelize.TEXT},
//   description: { type: Sequelize.TEXT },
//   imageUrl: { type: Sequelize.STRING },
//   viewCount: { type: Sequelize.INTEGER },
//   createdAt: { type: Sequelize.DATE },
//   updatedAt: { type: Sequelize.DATE },
// });


function validateArticle(article) {
  const schema = Joi.object().keys({
    title: Joi.string().min(2).max(255),
    key: Joi.string().min(5).max(255),
    content: Joi.string().required(),
    description: Joi.string().require(),
    imageUrl: Joi.string(),
  });
  
  return schema.validate(article);
}


module.exports = Article;
module.exports.validateArticle = validateArticle;