const { resolve } = require('path')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {    
    entry: './main.js', //项目入口文件        
    //输出     
    output: {                  
        filename: 'built.js',  //打包后js的名称        
        path: resolve(__dirname, 'build'),  //打包输出到当前路径的build文件夹中        
        publicPath: './', //注意此处，是服务器下资源引用的根目录   
        // clean: true  //即可清楚dist的文件 
    },      
    //loader配置规则          
    module: {           
        rules:[]        
    },        
    plugins: [
        new HtmlWebpackPlugin({
            template:'./index.html' //以该目录下的html为模版
        })
    ], //插件配置       
    mode: 'development', //开发模式(开发模式和生产模式)
    devServer:{
        // contentBase: 'build',
        // cpmpress: true, //开启gzip压缩
        port: 8000,
        open: true, //自动打开浏览器
        hot:true
    },
    target: 'web'
}
