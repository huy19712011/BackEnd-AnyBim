const _ = require('lodash');
const express = require('express');
const router = express.Router();

// const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const {Image, validateImage} = require('../models/Image');

// /images
router.get('/', async (req, res) => {
  const images = await Image.findAll({
    // Patrick tutorial
    // order: sql.literal("date DESC"),
    // docs
    order: [
      ['createdAt', 'DESC'],
    ],
    // this conditional (published: true) we can do in FrontEnd, using (Rxjs.map + Array.filter) functions
    // where: { published: true }, 
  });
  return res.send(images);
});

// /images/id
router.get('/:id', async (req, res) => {
  const image = await Image.findOne({where: {id: parseInt(req.params.id)}});
  if (!image)
  return res.status(404).send("The image with the given ID was not found.");
  
  return res.send(image);
});


// router.delete('/:id', [auth, admin], async (req, res) => {
router.delete('/:id', async (req, res) => {
  const image = await Image.findOne({where: {id: parseInt(req.params.id)}});
  if (!image) {
    return res.status(404).send("The image with the given ID was not found.");
    // return res.sendStatus(404);
  }
  
  // Image.destroy({where: {id: parseInt(req.params.id)}});
  image.destroy();
  return res.send(image);
  
});


// router.post('/', auth, async (req, res) => {
router.post('/', async (req, res) => {
  const { error } = validateImage(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  // // Check unique of email
  // if (req.body.email && await User.findOne({where: {email: req.body.email}})) {
  //   return res.status(400).send("This email is already used.");
  // }
  
  const image = new Image(_.pick(req.body, ['type', 'name', 'imageUrl', 'data']));
  
  await image.save();
  
  return res.send(article);
  
});

router.put('/:id', async (req, res) => {
  const image = await Image.findOne({where: {id: parseInt(req.params.id)}});
  if (!image)
  return res.status(404).send("The image with the given ID was not found.");
  
  const { error } = validateImage(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  await image.update({
    type: req.body.type,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    data: req.body.data,
  });
  
  return res.send(image);
});

module.exports = router;
