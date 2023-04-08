// Express是基于node.js的web开发框架,与node.js内置的http模块类似
// 专门用来创建web服务器的
// 监听get请求，app.get()方法
// 监听post请求，app.post()方法
const express = require('express')
//导入路由模块
const express_router = require('./express_router')
const app = express()

//托管静态资源目录
app.use(express.static('public'))

//注册路由选择模块
app.use('/api', express_router)

//app.use()函数的作用就是注册全局中间件




app.listen(8080,()=>{
    console.log('listen server running at http://127.0.0.1:8080')
})
app.get('/user',function(req,res){
    res.send({ 
        name: 'haoks',
        age: 20,
        gender: 'boy'
    })
})
app.get('/',(req,res)=>{
    console.log(req.query)
    res.send(req.query)
})

app.post('/post',(req,res)=>{
    res.send('post success')
})
app.get('/user/:id',(req,res)=>{
    //req.params是动态匹配到的url参数
    console.log(req.params)
    res.send(req.params)
})


const mw = function(req,res,next){ 
    console.log('中间件函数')
    next()
}