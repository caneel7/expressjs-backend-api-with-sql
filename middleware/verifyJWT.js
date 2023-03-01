const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) res.sendStatus(403)
            req.user = decoded.userInfo.userName
            req.roles = decoded.userInfo.roles;
            next()
        }
    )
}

module.exports = verifyJWT;