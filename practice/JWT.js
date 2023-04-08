const express = require('express')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const cors = require('cors')
const bodyParser = require('body-parser')

const app =express()

const secretKey = 'hello,haoks'



app.use(cors())

//解析post表单数据的中间件
app.use(bodyParser.urlencoded({ extended:false}))

//注册jwt字符串解析还原成json对象中间件
//当配置完成中间件，可以将用户信息挂载到req.user上
app.use(expressJWT({secret: secretKey,algorithms:['HS256']}).unless({ path: [/^\/api\//]}))



//注册解析expree错误的全局中间件，解析jwt失败后产生的错误
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError')
        return res.send({
            status: 401,
            message: '无效的token'
        })
    res.send({
        status: 500,
        message:'未知错误'
    })
})


app.listen(8080,function(){
    console.log('listen at http://127.0.0.1:8080')
})


app.get('/admin/getuser',function(req,res){
    console.log(req.user)
    res.send({
        status:200,
        message:'获取用户信息成功',
        data: req.user,
    })

})

//登陆接口



app.post('/api/login',function(req,res){
    const userinfo = req.body
    if(userinfo.username !== 'admin'|| userinfo.password !=='123456'){
        return res.send({
            status:400,
            message:'登陆失败'
        })
    }
    //调用jwt.sign()方法生成jwt字符串
    // 参数1：用户的信息对象
    // 参数2：加密的密钥
    // 参数3：配置对象，可以配置token有效期
    res.send({
        status: 200,
        message: '登陆成功',
        token: "Bearer "+ jwt.sign({username: userinfo.username },secretKey,{ expiresIn: '30s' })
    })
})
