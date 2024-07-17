const express = require('express');
const router = express.Router();
const ownermodel = require('../models/owner-model');


if(process.env.NODE_ENV==='development')
 {
    router.post('/create', async (req,res)=>{

       let owners   =   await ownermodel.find();

       if(owners.length>0)
       {
       return res.status(203).send("no right");
       }
       else{
        let {fullname,email,password} = req.body;

        const owner = await ownermodel.create({
            fullname,
            email,
            password
        });

        res.send(owner);
       }
    })
 }  

router.get('/admin',(req,res)=>{
    let success = req.flash("success")
    res.render('createproducts',{success});
})







module.exports = router;