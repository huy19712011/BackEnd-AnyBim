const _ = require('lodash');
const express = require('express');
const router = express.Router();

const sql = require('sequelize');


const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


const {Article, validateArticle} = require('../models/Article');


router.get('/', auth, async (req, res) => {
  const articles = await Article.findAll({
    // Patrick tutorial
    // order: sql.literal("date DESC"),
    // docs
    order: [
      ['date', 'DESC'],
    ],
    // where: { published: true },
  });
  return res.send(articles);
});


router.get('/:id', auth, async (req, res) => {
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article)
  return res.status(404).send("The article with the given ID was not found.");
  
  return res.send(article);
});


router.delete('/:id', [auth, admin], async (req, res) => {
// router.delete('/:id', async (req, res) => {
  const article = await Article.findOne({where: {id: parseInt(req.params.id)}});
  if (!article) {
    return res.status(404).send("The article with the given ID was not found.");
    // return res.sendStatus(404);
  }
  
  // User.destroy({where: {id: parseInt(req.params.id)}});
  article.destroy();
  return res.send(article);
});



// router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  // // Check unique of title
  // if (req.body.title && await Article.findOne({where: {title: req.body.title}})) {
  //   return res.status(400).send("This title is already exitsts.");
  // }
  
  const article = new Article(_.pick(req.body, ['title', 'key', 'content', 'description', 'imageUrl', 'viewCount', 'published']));
  
  await article.save();

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

  
  return res.send(article);
});

module.exports = router;
