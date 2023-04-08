// node.js中的模块化
// 1. 内置模块  如 fs,http,path
// 2. 自定义模块    用户自定义的js文件
// 3. 第三方模块
// 在自定义模块中可以使用module.exports对象,将模块共享,
// 外界require()方法导入自定义模块,得到的就是module.exports指向的对象(默认为空)

const path = require('path')
// console.log(path)

// 建议只使用module.export定义模块

// Node.js遵循了commonjs的模块化规范，
// 1、每个模块内部，module变量代表当前模块
// 2、module变量是一个对象，它的exports属性是对外的接口
// 3、加载某个模块就是加载模块的module.exports属性
const moment = require('moment')

const local_time = moment().format('YYYY-MM-MM HH:mm:ss')

console.log(local_time)