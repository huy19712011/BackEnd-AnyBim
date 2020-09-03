// const upload = require('express-fileupload');

const express = require('express');
const router = express.Router();

const {Image} = require('../models/Image');

  
  router.get('/', async (req, res) => {
    res.sendFile(__dirname + '/upload.html');
  });
  
  // app.post('/upload', async (req, res) => {
  router.post('/', async (req, res) => {
    if (req.files) {
      // console.log(req.files.file);
      let file = req.files.file;
      console.log(file.name);
      console.log(file);
  
      file.mv('./uploads/blog/images/' + file.name, err => {
        if (err) {
          res.send(err);
        } else {
          res.send('File uploaded');
        }
      });


      // Save to database
      Image.create({ 
        type: file.mimetype,
        name: file.name,
        imageUrl: 'http://localhost:8000/uploads/blog/images/' + file.name,
      });


    }
  });
   

module.exports = router;
