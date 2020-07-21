
const express = require('express');
const cors = require('cors');
// const sql = require('./sql');
const articles = require('./routes/articles');

const {Sequelize, DataTypes} = require('sequelize');
const { Model } = require('sequelize');
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
    console.log('Error123: ', err);
  }
})();


const app = express();

const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:4000']
}
app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log('Server is started ...');
});


// const Article = sequelize.define('article', {
//   title: { type: DataTypes.STRING },
//   key: { type: Sequelize.STRING },
//   date: { type: Sequelize.DATE },
//   content: { type: Sequelize.TEXT},
//   description: { type: Sequelize.TEXT },
//   imageUrl: { type: Sequelize.STRING },
//   viewCount: { type: Sequelize.INTEGER }
// });
// console.log('test123:', Article === sequelize.models.Article);

// Create Model
class Article extends Model {}
Article.init({
  title: { type: DataTypes.STRING },
  key: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: Date.now() },
  content: { type: DataTypes.TEXT},
  description: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING },
  viewCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {sequelize, modelName: 'article'});

// Init data in database
const one = Article.build({ title: "One", key: 'key 111', content: 'this is a title 1', description: 'description 1', imageUrl: 'imageUrl 1'});
console.log(one instanceof Article); // true
console.log(one.title); // "one"

one.save();
// (async () => await one.save())();

(async () => {
  const two = await Article.create({ title: "Two", key: 'key 222', content: 'this is a title 2', description: 'description 2', imageUrl: 'imageUrl 2'});
  console.log('two: ', two instanceof Article); // true
  console.log('two.title', two.title); // "two"
})();

// Query data
// app.get('/articles', async (req, res) => {
//   const articles = await Article.findAll();
//   res.send(articles);
// });

app.use('/articles', articles);
