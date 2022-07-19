const jwt = require('jsonwebtoken')

function jwtToken({id,name,email}){
    const user = {id,name,email};
    const accessToken = jwt.sign(user,process.env.JWT_ACCESS_SECRET,{expiresIn:'5d'})
    const refreshToken = jwt.sign(user,process.env.JWT_REFRESH_SECRET,{expiresIn:'10d'});
    return ({accessToken,refreshToken})
}

module.exports = jwtToken