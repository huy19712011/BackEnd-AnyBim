const express = require('express');
const router = express.Router();
const _ = require('lodash');


const auth = require('../middleware/auth');
const admin = require('../middleware/admin');



const Article = require('../models/Article');
const validateArticle = require('../models/Article');

router.get('/', async (req, res) => {
  const articles = await Article.findAll();
  res.send(articles);
});


router.get('/:id', async (req, res) => {
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article)
    return res.status(404).send("The article with the given ID was not found.");
  
  return res.send(article);
});


// router.delete('/:id', [auth, admin], async (req, res) => {
router.delete('/:id', async (req, res) => {
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article) {
    return res.status(404).send("The article with the given ID was not found.");
    // return res.sendStatus(404);
  }
  
  // Article.destroy({where: {id: parseInt(req.params.id)}});
  article.destroy();
  return res.send(article);
  
});


// router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log("ok");
  // // Check unique of title
  // if (req.body.title && await Article.findOne({where: {title: req.body.title}})) {
  //   return res.status(400).send("This title is already exitsts.");
  // }
  
  // const article = new Article(_.pick(req.body, ['title', 'key', 'content', 'description', 'imageUrl', 'viewCount']));
  const article = new Article ({
    title: req.body.title,
    key: req.body.key,
    content: req.body.content,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    viewCount: req.body.viewCount,
  });
  
  await article.save();
  
  // const token = article.generateAuthToken();
  // return res.header('x-auth-token', token).send(_.pick(article, ['title', 'key', 'content', 'description', 'imageUrl']));
  
  // return res.send(_.pick(article, ['title', 'key', 'content', 'description', 'imageUrl', 'viewCount']));
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
  });
  
  return res.send(article);
});

module.exports = router;
