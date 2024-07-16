const jwt = require("jsonwebtoken");

const genrateToken = (email)=>{
    return jwt.sign({email},process.env.JWT);
}

module.exports ={genrateToken}
