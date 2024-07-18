
const {genrateToken} = require('../utils/genratekey');
const userModel = require('../models/user-model');
const productModel = require('../models/product-model');
const bcrypt = require('bcrypt');
const ownermodel= require('../models/owner-model');




authController = async (req,res)=>{


    try
    {      let {fullname,email,password}= req.body;

       const user =  await userModel.findOne({email});
       if(user)
    {
        req.flash("error","already");
        return res.redirect('/');
    }
       
    
          bcrypt.hash(password,12,async (err,hash)=>{
            if(err) return res.send(err);
               
             const createdUser = await userModel.create({
                 fullname,email,password:hash });
                let token = genrateToken(createdUser.email);
                res.cookie('token',token);
                return res.redirect('/shop');
    
          })
    
    }
    catch(err)
    {
        req.flash('error',err);
    return res.redirect('/');
    }
    
}
loginUser = async (req,res)=>{
   try {
    let {email,password} = req.body;

    let user = await userModel.findOne({email});
    if(!user){ 

        req.flash("error","not valid");
        return res.redirect('/');
    }
   const result = await bcrypt.compare(password,user.password);

   if(result===true)
    {
        let token = genrateToken(user.email);
        res.cookie('token',token);
        return  res.redirect('/shop');
    }
    else{
        req.flash("error","wrong Password");
       return res.redirect('/')
    }
   } catch (error) {
      return res.send(error);
   }

}
logOut = (req,res)=>{
    try {
        res.cookie('token','');
        req.flash("error","logout Success");
        return res.redirect('/');
    } catch (error) {
        return res.send(error);
    }
}
loginOwner= async(req,res)=>{
    try {
        let {email,password} = req.body;
    
        let owner = await ownermodel.findOne({email});
        if(!owner){ 
    
            req.flash("error","not valid owner");
            return res.redirect('/owners/login');
        }
       const result = await bcrypt.compare(password,owner.password);
    
       if(result===true)
        {
            let token = genrateToken(owner.email);
            res.cookie('token',token);
            return  res.redirect('/owners/createproduct');
        }
        else{
            req.flash("error","wrong Password");
           return res.redirect('/owners/login')
        }
       } catch (error) {
          return res.send(error);
       }
}   
createProduct = async (req,res)=>{
    try {
        let { name,price,discount,bgcolor, panelcolor,textcolor} = req.body;
      
   
       await productModel.create({
           image:req.file.buffer,
           name,
           price,
           discount,
           bgcolor,
           panelcolor,
           textcolor
   
       })
       req.flash("success","product created successfully");
     return  res.redirect('/owners/admin');
    } catch (error) {
    return res.send(error);
    }
}

module.exports={authController,loginUser,logOut, createProduct,loginOwner};
