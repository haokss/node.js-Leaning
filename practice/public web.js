const http= require('http')
const path= require('path')
const fs = require('fs')

const server = http.createServer()

server.on('request',(req,res)=>{
    let fpath = ''
    if(req.url==='/')
        //默认转跳到public/index.html下
        fpath = path.join(__dirname,'./public/index.html')
    else
        fpath = path.join(__dirname,req.url)


    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
        if(err)
            return res.end('404 not find')
        res.end(dataStr)
    })
})

server.listen(8080,()=>{
    console.log('server listen at http://127.0.0.1:8080')
})