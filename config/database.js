const mysql = require('mysql')

const database = mysql.createConnection({
    host : 'localhost',
    user : 'admin',
    password : '07062000',
    database : 'gitproject'
})

module.exports = database;