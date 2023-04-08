//根据不同的url相应不同的html内容
 const http = require('http')

 const server = http.createServer()

 server.on('request',(req,res)=>{
    const url = req.url
    let content =`<h1>404 NOT FIND</h1>`
    if(url ==='/'||url ==='/index.html'){
        content = `<h1>首页</h1>`
    }
    else if(url === '/about.html'){
        content = `<h1>about</h1>`
    }
    //设置中文编码格式防止乱码
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.end(content)
 })
server.listen(8080,function(){
    console.log('server listen to http://127.0.0.1:8080')
})
