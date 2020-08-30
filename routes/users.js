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

// const User = require('../models/User');
const {User, validateUser} = require('../models/User');


// Create some rows, use once for init data in table
/**
using create()
**/
// User.create({ name: "One", email: 'One@gmail.com', password: '123456'});
// User.create({ name: "Two", email: 'Two@gmail.com', password: '123456'});

// /**
//   using build() + save()
// **/
// User.sync({force: true}).then(() => {
//   const one = User.build({ name: "One", email: 'One@gmail.com', password: '123456'});
//   one.save();
// });



// function asyncMiddleware(handler) {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (ex) {
//       next(ex);
//     }
//   };
// }

// router.get('/', asyncMiddleware(async (req, res) => {
//   const users = await User.findAll();
//   return res.send(users);
// }));

router.get('/', async (req, res) => {
  // add this only for test winston
  // throw new Error('Could not get the users')
  // return new Error('Could not get the users'); // this not work?

  const users = await User.findAll();
  return res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findOne({where: {id: parseInt(req.params.id)}});
  if (!user)
  return res.status(404).send("The user with the given ID was not found.");
  
  return res.send(user);
});


// router.get('/me', auth, async (req, res) => {
//   console.log(req);
//   const user = await User.findOne({where: {id: req.user.id}});
//   // const user = await User.findByPk(req.user._id);
//   res.send(user);
// });


router.delete('/:id', [auth, admin], async (req, res) => {
  /**
  way 1
  **/
  const user = await User.findOne({where: {id: parseInt(req.params.id)}});
  if (!user) {
    return res.status(404).send("The user with the given ID was not found.");
    // return res.sendStatus(404);
  }
  
  // User.destroy({where: {id: parseInt(req.params.id)}});
  user.destroy();
  return res.send(user);
  
  
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

router.post('/', auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  // Check unique of email
  if (req.body.email && await User.findOne({where: {email: req.body.email}})) {
    return res.status(400).send("This email is already used.");
  }
  
  // const user = new User ({
  //   name: req.body.name,
  //   // email: req.body.email || 'testRESET@gmail.com', // we can reset default value here
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  
  const user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  await user.save();
  
  const token = user.generateAuthToken();
  // const token = jwt.sign({email: user.email}, config.get('jwtPrivateKey'));
  // return res.send(user);
  return res.header('x-auth-token', token).send(_.pick(user, ['name', 'email', 'isAdmin']));
  
});

router.put('/:id', [auth, admin], async (req, res) => {
  const user = await User.findOne({where: {id: parseInt(req.params.id)}});
  if (!user)
  return res.status(404).send("The user with the given ID was not found.");
  
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);
  await user.update({
    name: req.body.name,
    email: req.body.email,
    password: newPassword,
  });
  
  return res.send(user);
});

module.exports = router;
