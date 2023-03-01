const { format } = require('date-fns')
const { v4 : uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises;

const logEvents = async (message,fileName)=>{

    const dateItem = format(new Date(),'ddMMMyyyy\tHH:mm:ss');
    const logItem = `${dateItem}\t${uuid()}\t${message}\n`;

    try{
        if(!fs.existsSync(path.join(__dirname,'..','Logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','Logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','Logs',fileName),logItem);
    }catch(err){
        console.log(err)
    }
}

const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`,'requestLogs.txt');
    console.log(`${req.method}\t${req.path}`);
    next();
};

module.exports = {
    logEvents,
    logger
}