const express = require('express');
const router = express.Router();
const {authController,loginUser,logOut}= require('../controllers/authController')
const {isLoggedIn} = require("../middlewares/isLoggedIn")



router.get('/',(req,res)=>{
    res.send("userroute");
})
router.post('/register',authController);
router.post('/login',loginUser);
router.get('/logout',logOut);





module.exports = router;