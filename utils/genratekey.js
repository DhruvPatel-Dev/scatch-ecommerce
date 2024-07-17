const jwt = require("jsonwebtoken");

const genrateToken = (email)=>{
    return jwt.sign({email},process.env.SECRET_KEY);
}

module.exports ={genrateToken}
