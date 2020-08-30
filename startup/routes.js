const express = require('express');
const { json } = require('body-parser');


const articles = require('../routes/articles');
const articles_admin = require('../routes/articles_admin');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const upload = require('../routes/upload');


module.exports = function (app) {
  app.use(express.json());
  app.use('/articles', articles);
  app.use('/admin/articles', articles_admin);
  app.use('/users', users);
  app.use('/auth', auth);
  app.use('/upload', upload);

  app.use(error);

  
}