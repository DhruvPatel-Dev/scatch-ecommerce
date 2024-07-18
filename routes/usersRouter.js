const express = require('express');
const router = express.Router();
const {authController,loginUser}= require('../controllers/authController')
const userModel = require('../models/user-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');


router.post('/register',authController);
router.post('/login',loginUser);
router.get('/cart/:product_id/:update',isLoggedIn,async (req,res)=>{
         
   let user = await userModel.findOne({email:req.user.email});
   if(req.params.update==='add')
   {  
     user.cart.push(req.params.product_id);
      await user.save();
     res.redirect('/cart'); 
   }else{
     const index = await user.cart.indexOf(`${req.params.product_id}`);
     user.cart.splice(index,1)
     await user.save();
   res.redirect('/cart'); 
   }


})





module.exports = router;