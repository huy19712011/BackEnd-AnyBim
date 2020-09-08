const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const sql = require('sequelize');

// const asyncMiddleware = require('../middleware/async');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

// const Article = require('../models/Article');
// const {Article} = require('../models/Article');
// const {validateArticle} = require('../models/Article');
// const validateArticle = require('../models/Article');

const {Product, validateProduct} = require('../../models/Product');


router.get('/', async (req, res) => {
  const products = await Product.findAll({
    // Patrick tutorial
    // order: sql.literal("date DESC"),
    // docs
    order: [
      ['createdAt', 'ASC'],
    ],
    // this conditional (published: true) we can do in FrontEnd, using (Rxjs.map + Array.filter) functions
    // where: { published: true }, 
  });
  return res.send(products);
});


router.get('/:id', async (req, res) => {
  const product = await Product.findOne({where: {id: parseInt(req.params.id)}});
  if (!product)
  return res.status(404).send("The product with the given ID was not found.");
  
  return res.send(product);
});


// router.delete('/:id', [auth, admin], async (req, res) => {
router.delete('/:id', async (req, res) => {
  /**
  way 1
  **/
  const product = await Product.findOne({where: {id: parseInt(req.params.id)}});
  if (!product) {
    return res.status(404).send("The product with the given ID was not found.");
    // return res.sendStatus(404);
  }
  
  // User.destroy({where: {id: parseInt(req.params.id)}});
  product.destroy();
  return res.send(product);
  
});

// router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
  const { error } = validateProduct(req.body);
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
  
  const product = new Product(_.pick(req.body, ['name', 'title', 'imageUrl', 'content', 'description',]));
  // const salt = await bcrypt.genSalt(10);
  // article.password = await bcrypt.hash(article.password, salt);
  
  await product.save();
 
  return res.send(product);
  
});

router.put('/:id', async (req, res) => {
  const product = await Product.findOne({where: {id: parseInt(req.params.id)}});
  if (!product)
  return res.status(404).send("The product with the given ID was not found.");
  
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  await product.update({
    name: req.body.name,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    description: req.body.description,
  });

  return res.send(product);
});

module.exports = router;
