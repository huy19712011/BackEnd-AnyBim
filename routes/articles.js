const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// const Article = require('../models/Article');
// const {Article} = require('../models/Article');
// const {validateArticle} = require('../models/Article');
// const validateArticle = require('../models/Article');

const {Article, validateArticle} = require('../models/Article');


router.get('/', async (req, res) => {
  // add this only for test winston
  // throw new Error('Could not get the users')

  const articles = await Article.findAll();
  return res.send(articles);
});


router.get('/:id', async (req, res) => {
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article)
  return res.status(404).send("The article with the given ID was not found.");
  
  return res.send(article);
});


router.delete('/:id', [auth, admin], async (req, res) => {
  /**
  way 1
  **/
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article) {
    return res.status(404).send("The article with the given ID was not found.");
    // return res.sendStatus(404);
  }
  
  // User.destroy({where: {id: parseInt(req.params.id)}});
  article.destroy();
  return res.send(article);
  
  
  /**
  way 2
  **/
  // const id = req.params.id;
  // const user = await User.findByPk(id);
  // if (!user) return res.status(404).send("The user with the given ID was not found.");
  
  // await user.destroy(id);
  // return res.send(user);
  
});


// router.get('/me', auth, async (req, res) => {
//   // const user = await User.findByPk(req.user.id);
//   const user = await User.findOne({where: {email: req.user.email}});
//   res.send(user);
// });

// router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  // // Check unique of email
  // if (req.body.email && await User.findOne({where: {email: req.body.email}})) {
  //   return res.status(400).send("This email is already used.");
  // }
  
  // const user = new User ({
  //   name: req.body.name,
  //   // email: req.body.email || 'testRESET@gmail.com', // we can reset default value here
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  
  const article = new Article(_.pick(req.body, ['title', 'key', 'content', 'description', 'imageUrl', 'viewCount', 'published']));
  // const salt = await bcrypt.genSalt(10);
  // article.password = await bcrypt.hash(article.password, salt);
  
  await article.save();
  
  // const token = article.generateAuthToken();
  // // const token = jwt.sign({email: user.email}, config.get('jwtPrivateKey'));
  // // return res.send(user);
  // return res.header('x-auth-token', token).send(_.pick(article, ['name', 'email', 'isAdmin']));

  // return res.send(_.pick(article, ['title', 'key', 'content', 'description', 'imageUrl', 'viewCount', 'published']));
  return res.send(article);
  
});

router.put('/:id', async (req, res) => {
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article)
  return res.status(404).send("The article with the given ID was not found.");
  
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  await article.update({
    title: req.body.title,
    key: req.body.key,
    content: req.body.content,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    viewCount: req.body.viewCount,
    published: req.body.published,
  });

  
    // article.title = req.body.title;
    // article.key = req.body.key;
    // article.content = req.body.content;
    // article.description = req.body.description;
    // article.imageUrl = req.body.imageUrl;
    // article.viewCount = req.body.viewCount;
    // article.published = req.body.published;
    // article.save();
  
  
  return res.send(article);
});

module.exports = router;
