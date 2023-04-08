let express = require('express')

let router = express.Router()

//挂载具体的路由
router.get('/router',(req,res)=>{
    res.send('get router')
})

// 向外导出路由对象
module.exports = router