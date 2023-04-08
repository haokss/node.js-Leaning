const express = require('express')

const app = express()

// 定义全局中间件 中间件的执行顺序是定义顺序
const wm = function(req,res,next){
    console.log('中间件1')
    next()
}

// 使用局部的中间件
app.get('/',wm,function(req,res){
    res.send('home page')
})

app.listen(8080,function(){
    console.log('listening')
})