//http模块，客户端和服务器 
// 创建最基本的web服务器：1、导入http模块
// 2、创建web服务器实例
// 3、为服务器绑定request事件，监听客户端请求
// 4、启动服务器
const http = require('http')

const server = http.createServer()

server.on('request',(req,res)=>{
    const url = req.url
    const method = req.method
    const str = `A requst请求 url is ${req.url},and request method is ${req.method}`
    console.log(str)
    // 使用res.end()方法时向客户端发送中文会导致乱码,需要手动设置编码格式
    res.setHeader('Content-Type','text/html; charset=utf-8')
    // res响应客户端内容
    res.end(str)


})
server.listen(8080,function(){
    console.log('server run at http://127.0.0.1:8080')
})
//req请求对象，收到客户端请求，通过server.on绑定request处理函数，访问
// 客户端相关的数据和属性





