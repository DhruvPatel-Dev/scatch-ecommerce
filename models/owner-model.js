const mongoose = require('mongoose');


const ownerSchemna = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    gstin:{
        type:String,
        default:"none"
    }

});



module.exports=mongoose.model('owner',ownerSchemna);
