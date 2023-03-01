const database = require('../config/database')
const bcrypt = require('bcrypt')


const registerHandler = async (req,res)=>{

    const { userName, password } = req.body 

    if(!userName || !password) return res.status(400).json({"message":"username and password are necessary."})
    const foundUser = database.query(`SELECT * FROM users WHERE userName = '${userName}'`,async(err,result)=>{
        if(err){
            throw err
        }else if(result[0]){
            return res.status(401).json({"message":"username already exists."})
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            let sql = `INSERT INTO users SET ?`
            database.query(sql,{userName : userName, password : hashedPassword},(err,result)=>{
                if(err) throw err
                res.status(200).json({"success":"user created."})
            })
        }
    })
}

module.exports = {registerHandler};