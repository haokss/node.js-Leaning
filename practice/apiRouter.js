const express = require('express')

const router = express.Router()

//挂载对应的路由
router.get('/get',function(req,res){
    //req.query 获取客户端通过查询字符串发送到服务端的数据
    const query = req.query
    res.send({
        status: 0, //状态码：0表示成功、1表示失败
        msg: 'GET Success', // 状态的描述
        data: query
    })
})
router.post('/post',function(req,res){
    //通过req.body获取请求体中包含url-encoded 格式的数据
    const body = req.body
    //调用res.send()方法向客户端相应数据
    res.send({
        status:0,
        msg: 'Post Success',
        data: body
    })
})
router.delete('/delete',function(req,res){
    res.send({
        status:0,
        msg: 'Delete Success',

    })
})

module.exports = router