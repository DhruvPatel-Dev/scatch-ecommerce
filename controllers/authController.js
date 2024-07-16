
const {genrateToken} = require('../utils/genratekey');
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');




authController = async (req,res)=>{


    try
    {      let {fullname,email,password}= req.body;

       const user =  await userModel.findOne({email});
       if(user) return res.send('already');
          bcrypt.hash(password,12,async (err,hash)=>{
            if(err) return res.send(err)
               
             const createdUser = await userModel.create({
                 fullname,email,password:hash });
                let token = genrateToken(createdUser.email);
                res.cookie('token',token);
                res.send("done");
    
          })
    
    }
    catch(err)
    {
     res.send(err.message)
    }
    
}
loginUser = async (req,res)=>{
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
        req.flash('error',"Success");
      return  res.redirect('/');
    }
    else{
       req.flash("error","wrong Password")
       return res.redirect('/')
    }

}
logOut = (req,res)=>{
     res.cookie('token','');
     res.redirect('/');
}

module.exports={authController,loginUser,logOut};
