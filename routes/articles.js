const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const {Article, articleSchema} = require('../models/Article');

router.get('/', async (req, res) => {
  const articles = await Article.findAll();
  res.send(articles);
});

router.post('/', async (req, res) => {
  const schema = {
    
  };
});


module.exports = router;
