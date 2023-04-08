const express = require('express')
const router = require('./apiRouter')
const cors = require('cors')
//创建与数据库的连接

const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password: '123456',
    database:'user'

})

const a_user = {user_name: 'flowers',user_password:'0000'}
const sqlStr =  'insert into test_user_info (user_name,user_password) values (?,?)'

//另一种写方法
const sqlStr1 = 'insert into test_user_info set ?'
db.query(sqlStr1,a_user,(err,results)=>{
    if(err)
        return console.log(err.message)
    console.log(results)
    //根据affectedRows判断是否插入成功
    if(results.affectedRows === 1){console.log('数据插入成功')}
})

 


// 创建服务器实例
const app = express()

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use('/api',router)


app.listen(8080,function(){
    console.log('listen at http://127.0.0.1:8080')

})