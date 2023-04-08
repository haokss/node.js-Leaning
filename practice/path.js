// path模块，处理路径的模块
const fs = require('fs')
const path = require('path')
// path.join()方法
const pathStr = path.join('/a','/b','/he.txt')
// 将路径拼接形成完整的路径\a\b\he.txt
console.log(pathStr)
const pathStr1 = path.join(__dirname,'2.txt')
// C:\Users\haoks\Desktop\Language Practice\node.js\practice\2.txt
console.log(pathStr1)
// 尽量使用path.join方法来进行字符串的拼接
fs.readFile(path.join(__dirname,'2.txt'),'utf-8',function(err,dataStr){
    if(err){
        console.log(err.message)
    }
    console.log(dataStr)
})

// path.basename方法获取路径中的文件名
let pathname1 = path.basename(pathStr1,'.txt')//txt为可选参数，去掉拓展名
console.log(pathname1)

// path.extname方法获取文件中的拓展名
let fpath = path.extname(pathStr1)
console.log(fpath)// .txt
