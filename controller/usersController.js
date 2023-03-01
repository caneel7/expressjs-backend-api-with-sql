const database = require('../config/database')

const getAllUser = (req,res)=>{

    let sql = `SELECT * FROM users`
    database.query(sql,(err,result)=>{
        if(err) throw err
        res.json(result)
    })
}

const deleteUser = (req,res)=>{

    if(!req.body.id) return res.sendStatus(400)
    let sql = `DELET FROM users WHERE id = ${req.body.id}`
    database.query(sql,(err,result)=>{
        if(err) {
            throw err
        }else if(!result[0]){
            res.json({"message":`user not found`})
        }else{
            res.json({"success":"user deleted"})
        }
    })
}

const getUser = (req,res)=>{

    if(!req.params.id) return res.sendStatus(400)
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`
    database.query(sql,(err,result)=>{
        if(err){
            throw err
        }else if(!result[0]){
            res.json({"message":"user not found"})
        }else{
            res.json(result)
        }
    })
}

module.exports = {
    getAllUser,
    deleteUser,
    getUser
}