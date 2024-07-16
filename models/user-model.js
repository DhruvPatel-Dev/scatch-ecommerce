const mongoose = require('mongoose');



const userSchemna = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    isadmin:Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    profile:String

});



module.exports=mongoose.model('user',userSchemna);
