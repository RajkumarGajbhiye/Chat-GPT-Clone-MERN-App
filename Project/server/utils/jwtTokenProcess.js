const jwt = require("jsonwebtoken");

const authTokenCreation = id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


module.exports = {authTokenCreation}