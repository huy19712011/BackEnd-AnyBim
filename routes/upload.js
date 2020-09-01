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
  
      file.mv('./uploads/' + file.name, err => {
        if (err) {
          res.send(err);
        } else {
          res.send('File uploaded');
        }
      });


      // Save to database
      var fs  = require('fs');
      function base64_encode(file) {
          // read binary data
          var bitmap = fs.readFileSync(file);
          // convert binary data to base64 encoded string
          return new Buffer.from(bitmap).toString('base64');
      }
      // var bitmap = base64_encode("./uploads/" + file.name);
      var bitmap = new Buffer.from(file.data).toString('base64');

      Image.create({ 
        type: file.mimetype,
        name: file.name,
        imageUrl: file.name,
        // imageUrl: imageURL,
        // data: file.data,
        data: bitmap,
      });


    }
  });
   

module.exports = router;
