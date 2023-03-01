const database = require('../config/database')

const logoutHandler = async (req,res)=>{

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    database.query(`SELECT * FROM users WHERE refreshToken = '${refreshToken}'`,(err,result)=>{
        if(err){
            throw err
        }else if(!result[0]){
            res.clearCookie('jwt',{httpOnly : true})
            return res.sendStatus(204)  
        }else{
            database.query(`UPDATE users SET refreshToken = NULL WHERE id = '${result[0].id}'`,(err,result)=>{
                if(err){
                    throw err
                }else{
                    res.clearCookie('jwt',{httpOnly : true})
                    res.sendStatus(204)
                }
            })
        }
    })

}

module.exports = {logoutHandler}