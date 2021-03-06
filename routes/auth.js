const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {User} = require('../models/User');

router.post('/', async (req, res) => {
  
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  const user = await User.findOne({where: {email: req.body.email}});
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();
  // const token = jwt.sign({email: user.email}, config.get('jwtPrivateKey'));
  return res.send({token});

});


/**
  add this to check auth in FrontEnd (Patrick tutorial). Not Need if using @auth0/angular-jwt
**/
router.post("/check", async (req, res) => {
  
  var valid = verifyJwt(req.body.token);
  res.send(valid != false);
});


function verifyJwt(token) {
  try {
    return jwt.verify(token, config.get('jwtPrivateKey'));
  } catch (ex) {
    return false;
  }


  // try {
  //   return jwt.verify(token, publicKey, verifyOptions);
  // } catch (err) {
  //   return false;
  // }
}



function validateUser(req) {
  const schema = Joi.object().keys({
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
  });
  
  return schema.validate(req);
}


module.exports = router;
