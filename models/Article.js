const { DataTypes, Model } = require('sequelize');

const sequelize = require('../sequelize');

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

module.exports = {Article, articleSchema};