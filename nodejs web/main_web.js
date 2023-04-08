const express = require('express')
const cors = require('cors')
const user_router = require('./router/user')

const joi = require('joi')

const {expressjwt}= require('express-jwt')
const config = require('./config')
const path = require('path')


const app = express()

//跨域中间件
app.use(cors())
//配置解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))

app.use(function(req,res,next){
    res.cc = function(err, status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(expressjwt({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({ path: [/^\/api\//]}))
// app.use(expressJWT({secret: secretKey,algorithms:['HS256']}).unless({ path: [/^\/api\//]}))

app.use(function(err,req,res,next){
    //验证失败错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    //身份认证失败错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    //未知错误
    res.cc(err)
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',user_router)

//注册监听事件,指定端口启动服务器
app.listen(8080,function(){
    console.log('listen at http://127.0.0.1:8080')
})