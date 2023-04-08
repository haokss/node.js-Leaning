const db = require('../db/index')
//导入用户密码加密包
const bcrypt = require('bcryptjs')
// token字符串生成包
const jwt = require('jsonwebtoken')
const config = require('../config')

const { func } = require('joi')

// 注册用户的路由处理函数

exports.regUser = (req, res) => {
    const userinfo = req.body
    // 校验数据是否合法
    // 用户表单数据的合法性验证

    // if(!userinfo.username||!userinfo.password){
    //     return res.send({
    //         status:1,
    //         message:'用户名或密码不合法' 
    //     })
    // }
    //从数据库查询用户是否已经存在
    db.query('select * from user_info where username=?',[userinfo.username],function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.length>0){
            return res.cc('用户名已存在') 
        }
        //判断完毕用户名不存在
        //利用bcrypt对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        //添加数据到数据库
        db.query('insert into user_info set ?',{username:userinfo.username,password:userinfo.password},
        function(err,results){
            if(err)
                return res.cc(err)
            if(results.affectedRows !== 1){
                return res.cc('用户注册失败，请稍后重试')
            }

        })
        res.send({
            status:0,
            message:'注册成功'
        })
    })
}
  
  // 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    console.log(req.body)
    //查询账号
    db.query('select * from user_info where username=?',userinfo.username,function(err,results){
        if(err)
            return res.cc(err)
        if(results.length !== 1)
            return res.cc('登陆失败')
    
        //密码对比
        const comparekey = bcrypt.compareSync(userinfo.password,results[0].password)

        if(!comparekey){
            return res.cc('登陆失败，密码错误')
        }
        //登陆成功，生成Token字符串
        const user = { ...results[0], password:'', user_pic:'' }

        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10h'
        })

        res.send({
            status:0,
            message:'登陆成功',
            token:tokenStr,
        })
    })
}