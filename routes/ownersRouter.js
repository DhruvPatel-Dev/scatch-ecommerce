const express = require('express');
const router = express.Router();
const ownermodel = require('../models/owner-model');
const {loginOwner} = require('../controllers/authController');
const { isLoggedInOwner } = require('../middlewares/isLoggedIn');
const bcrypt = require('bcrypt');


if(process.env.NODE_ENV==='development')
 {
    router.post('/create', async (req,res)=>{

       let owners = await ownermodel.find();

       if(owners.length>0)
       {
       return res.status(203).send("no right");
       }
       else{
        let {fullname,email,password} = req.body;
            bcrypt.hash(password,12,async function(err,hash){
                
        const owner = await ownermodel.create({
            fullname,
            email,
            password:hash
        });
        res.send(owner);
            })
         
        
       }
    })
 }  
router.get('/login',(req,res)=>{
    let error = req.flash("error");
    res.render('owner-login',{error,isLoggedIn:false});
})
router.post('/login',loginOwner);

router.get('/createproduct',isLoggedInOwner,(req,res)=>{
    let success = req.flash("success")
    res.render('createproducts',{success,isLoggedIn:false});
}
)





module.exports = router;