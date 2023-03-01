const jwt = require('jsonwebtoken');
const database = require('../config/database');

const refreshHandler = async (req,res)=>{

    console.log(req.cookies)
   const cookies = req.cookies
   if(!cookies?.jwt) return res.sendStatus(401)
   const refreshToken = cookies.jwt
   database.query(`SELECT * FROM users WHERE refreshToken = '${refreshToken}'`,(err,result)=>{
    if(err){
        throw err
    }else if(!result[0]){
        res.sendStatus(400)
    }else{
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded)=>{
                if(err || result[0].userName !== decoded.userInfo.userName){
                    res.sendStatus(403)
                }
                req.user = decoded.userInfo.userName
                req.roles = decoded.userInfo.roles
                const accessToken = jwt.sign(
                    {
                        "userInfo":{
                            "userName": decoded.userInfo.userName,
                            "roles": decoded.userInfo.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn : '30s'}
                )
                res.json({accessToken})
            }
        )
    }
   })
}

module.exports = {refreshHandler}