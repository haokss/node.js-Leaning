const fs = require('fs')
fs.writeFile('./2.txt','abcd','utf-8',function(err,dataStr){
    if(err){
        return console.log(err.message)
    }
    console.log(dataStr)
})
fs.readFile(__dirname+'/2.txt','utf-8',function(err,dataStr){
    if(err){
        return console.log(err.message)
    }
    console.log(dataStr)
})