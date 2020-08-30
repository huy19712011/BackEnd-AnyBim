// const upload = require('express-fileupload');
const express = require('express');
const router = express.Router();

// module.exports = function (app) {
  // app.use(upload);
  
  // app.get('/upload', async (req, res) => {
  router.get('/', async (req, res) => {
    res.sendFile(__dirname + '/upload.html');
    // res.sendFile('./upload.html');
  });
  
  // app.post('/upload', async (req, res) => {
  router.post('/', async (req, res) => {
    if (req.files) {
      // console.log(req.files.file);
      let file = req.files.file;
      let filename = file.name;
      console.log(filename);
  
      file.mv('./uploads/' + filename, err => {
        if (err) {
          res.send(err);
        } else {
          res.send('File uploaded');
        }
      })
    }
  });
   
  
// }

module.exports = router;
