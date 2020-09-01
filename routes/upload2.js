// const upload = require('express-fileupload');

const multer = require('multer');
const path = require('path');

const express = require('express');
const router = express.Router();

const {Image} = require('../models/Image');


router.get('/', async (req, res) => {
  // res.sendFile(__dirname + '/upload.html'); // express-fileupload
  res.sendFile(path.join(`${__dirname}/multer.html`)); // multer
});


// Khởi tạo biến cấu hình cho việc lưu trữ file upload (only for multer)
let diskStorage = multer.diskStorage({
  
  destination: (req, file, callback) => {
    // Định nghĩa nơi file upload sẽ được lưu lại
    callback(null, "uploads_multer");
  },
  
  filename: (req, file, callback) => {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
    let match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    
    // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
  
});

// only for multer
// Khởi tạo middleware uploadFile với cấu hình như ở trên,
// Bên trong hàm .single() truyền vào name của thẻ input, ở đây là "file"
// let uploadFile = multer({storage: diskStorage}).single("file");
let uploadFile = multer({storage: diskStorage});

// app.post('/upload', async (req, res) => {
router.post('/', uploadFile.single("file"), async (req, res) => {
  /**
  1. using express-fileupload
  **/
  // if (req.files) {
  //   // console.log(req.files.file);
  //   let file = req.files.file;
  //   console.log(file.name);
  //   console.log(file);
    
  //   file.mv('./uploads/' + file.name, err => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.send('File uploaded');
  //     }
  //   });
    
    
  //   // Save to database
  //   let bitmap = new Buffer.from(file.data).toString('base64');
    
  //   Image.create({ 
  //     type: file.mimetype,
  //     name: file.name,
  //     imageUrl: file.name,
  //     data: bitmap,
  //   });
    
  // }
  
  /**
  2. using multer
  **/
  // uploadFile(req, res, (error) => {
    // Nếu có lỗi thì trả về lỗi cho client.
    // Ví dụ như upload một file không phải file ảnh theo như cấu hình của mình bên trên
    // if (error) {
    //   return res.send(`Error when trying to upload: ${error}`);
    // }
    
    if (req.file) {
      console.log(`------Request body-----`);
      console.log(req.body);
      
      console.log(`------Request file-----`);
      console.log(req.file);
      
      console.log(`------Test Done-----`)
      
      // Không có lỗi thì lại render cái file ảnh về cho client.
      // Đồng thời file đã được lưu vào thư mục uploads
      // res.sendFile(path.join(`${__dirname}/uploads_multer/${req.file.filename}`));
    
      Image.create({ 
        type: req.file.mimetype,
        name: req.file.filename,
        imageUrl: req.file.path,
        data: req.file.size,
      });
    }
  
  // });


  
});


module.exports = router;
