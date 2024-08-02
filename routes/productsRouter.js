const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const{createProduct} =require('../controllers/authController')


router.post('/create',upload.single('image'),createProduct);


    
module.exports = router;