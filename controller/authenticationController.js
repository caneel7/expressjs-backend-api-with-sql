const database = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const loginHanlder = async (req,res)=>{

    var foundUser = [];
    function setValue(value) {
        foundUser = value;
    }
    const { userName, password } = req.body
    if(!userName || !password) return res.sendStatus(400)
    database.query(`select * from users WHERE userName = '${userName}'`, async(err, result)=>{
      if(err) {
        throw err;
      } else {
        setValue(result[0]);
      }
      const match = await bcrypt.compare(password,foundUser.password)
      if(!match){
        res.sendStatus(401)
      }else{
        var role
        database.query(`SELECT * FROM roles WHERE user_roles = '${foundUser.id}';`,(err,result)=>{
            if(err){
                throw err
            }else{
                role = JSON.parse(JSON.stringify(result))
            }
            var roles = []
            role.forEach(element => roles.push(element.roles))
            const accessToken = jwt.sign(
                {"userInfo":{
                    "userName": foundUser.userName,
                    "roles": roles
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            const refreshToken = jwt.sign(
                {"userInfo":{
                    "userName": foundUser.userName,
                    "roles": roles
                }},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )
            res.cookie('jwt',refreshToken,{httpOnly : true, maxAge : 24 * 60 * 60 * 1000})
            database.query(`UPDATE users SET refreshToken = '${refreshToken}' WHERE id = '${foundUser.id}'`,(err,result)=>{
                if(err){
                    throw err
                }else{
                    console.log('ok')
                }
            })
            res.json({accessToken})
        })
      }
    });
   
}

module.exports = {loginHanlder}