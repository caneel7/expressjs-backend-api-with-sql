const database = require('../config/database')

const getAllEmployees = (req,res)=>{

    let sql = `SELECT * FROM employees`
    database.query(sql,(err,result)=>{
        if(err) {
            throw err
        }else{
            res.status(200).json(result)
        }
    })
}

const createNewEmployee = (req,res)=>{

    if(!req.body.firstName || !req.body.lastName) return res.status(400).json({"message":"firstname and lastname are required."})
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    let sql = `INSERT INTO employees (firstName,lastName) VALUES (?,?)`
    database.query(sql,[firstName,lastName],(err,result)=>{
        if(err){
            throw err
        }else{
            res.status(200).json({"message":`employee ${firstName} created.`})
        }
    })
}

const updateEmployee = (req,res)=>{

    if(!req.body.id) return res.sendStatus(400)
    let sql = [
        `UPDATE employees SET firstName = '${req.body.firstName}',lastName = '${req.body.lastName}' WHERE id = ${req.body.id}`,
        `UPDATE employees SET firstName = '${req.body.firstName}' WHERE id = ${req.body.id}`,
        `UPDATE employees SET lastName = '${req.body.lastName}' WHERE id = ${req.body.id}`
    ]
    var queryRequest 
    if(req.body.firstName && !req.body.lastName){
        queryRequest = sql[1]
    }else if(!req.body.firstName && req.body.lastName){
        queryRequest = sql[2]
    }else if(req.body.firstName && req.body.lastName){
        queryRequest = sql[0]
    }else if(!req.body.firstName || !req.body.lastName){
        queryRequest = `SELECT * from users`
    }
    database.query(queryRequest,(err,result)=>{
        if(err) throw err
        res.json({"success":"employee updated"})
    })
}

const deleteEmployee = (req,res)=>{

    if(!req.body.id) return res.sendStatus(400)
    let sql = `DELETE FROM employees WHERE id = ${req.body.id}`
    database.query(sql,(err,result)=>{
        if(err) throw err
        res.json({"success":"employee deleted"})
    })
}

const getEmployee = (req,res)=>{

    if(!req.params.id) return res.sendStatus(400)
    let sql = `SELECT * FROM employees WHERE id = ${req.params.id}`
    database.query(sql,(err,result)=>{
        if(err) throw err
        res.json(result)
    })
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}