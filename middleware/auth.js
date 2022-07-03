const jwt = require("jsonwebtoken")

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'] //bearer token sended  with requiest
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
        return res.status(401).json('unauthorized')
    }else{
        jwt.verify(token,JWT_ACCESS_SECRET,(error,user)=>{
            if(error){
                return res.status(403).json(error.message)
            }else{
                req.user = user;
                next()
            }
        })
    }


}

module.exports = authenticateToken