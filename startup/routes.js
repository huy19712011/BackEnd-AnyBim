const express = require('express');
const { json } = require('body-parser');

// Blog module
const articles = require('../routes/articles');
const articles_admin = require('../routes/articles_admin');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const upload = require('../routes/upload');
const images = require('../routes/images');

// Product module
const products = require('../routes/products/products');


module.exports = function (app) {
  app.use(express.json());
  
  // Blog module
  app.use('/articles', articles);
  app.use('/admin/articles', articles_admin);
  app.use('/users', users);
  app.use('/auth', auth);
  app.use('/upload', upload);
  app.use('/images', images);
  
  // Product module
  app.use('/products', products);
  
  app.use(error);

  
}