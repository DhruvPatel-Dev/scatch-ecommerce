const express = require('express');
const router = express.Router();
const {authController,loginUser}= require('../controllers/authController')



router.post('/register',authController);
router.post('/login',loginUser);






module.exports = router;