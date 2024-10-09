const mongoose = require('mongoose');
const d = require('debug')('development:mongoose');
const config=require('config');

///for set value of debug export DEBUG=development:mongoose
//for all use export DEBUG=development:*

mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{  //to get value from .json use config.get("MONGO_URI")
   d("connected");
}).catch((err)=>{
    d(err);
})


module.exports=mongoose.connection;