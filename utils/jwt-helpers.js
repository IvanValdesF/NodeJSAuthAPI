const jwt = require('jsonwebtoken')

function jwtToken({id,name,email}){
    const user = {id,name,email};
    const accessToken = jwt.sign(user,process.env.JWT_ACCESS_SECRET,{expiresIn:'1h'})
    const refreshToken = jwt.sign(user,process.env.JWT_REFRESH_SECRET,{expiresIn:'2h'});
    return ({accessToken,refreshToken})
}

module.exports = jwtToken