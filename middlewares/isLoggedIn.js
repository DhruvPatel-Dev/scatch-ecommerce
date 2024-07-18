const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const ownermodel = require('../models/owner-model');

const isLoggedIn = async (req,res,next)=>{
if(!req.cookies.token){
  req.flash("error","you need to login First");
    return res.redirect('/');
}
try{
    let decode = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
     
   let user = await userModel.findOne({email:decode.email});
   if(!user)
   { req.flash("error","unauthorizes")
    return res.redirect('/');
   }
   req.user=user;
   next()

}
catch(err)
{
  req.flash("error",err);
  return res.redirect('/');
}
}


const isLoggedInOwner = async (req,res,next)=>{
  if(!req.cookies.token){
    req.flash("error","you need to login First");
      return res.redirect('/owners/login');
  }
  try{
      let decode = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
       
     let owner = await ownermodel.findOne({email:decode.email});
     if(!owner)
     { req.flash("error","unauthorizes")
      return res.redirect('/owners/login');
     }
     next()
  
  }
  catch(err)
  {
    req.flash("error",err);
    return res.redirect('/owners/login');
  }
  }

module.exports={isLoggedIn,isLoggedInOwner};