require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const database = require('./config/database')

const corsOption = require('./config/corsOption');
const {logger} = require('./middleware/logEvents');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

app.use(logger)

app.use(cors(corsOption))

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/authentication'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));
app.use(verifyJWT)
app.use('/employees',require('./routes/api/employees'))
app.use('/users',require('./routes/api/users'))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'));
});


database.connect((err)=>{
    if(err){
        throw err
    }else{
        console.log(`database connected`)
        app.listen(PORT,()=> console.log(`server running on PORT ${PORT}`));
    }
})