// const path = require("path");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// // const CompressionPlugin = require('compression-webpack-plugin');
// // const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

// function resolve(dir){
// 	return path.join(__dirname, dir)
// }

const path = require('path');
var date= new Date();
module.exports = {
    
    publicPath: './',
    // assetsDir: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    /**
    * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
    *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
    * */
    productionSourceMap: false,
    filenameHashing: true,
    lintOnSave: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // console.log('手机彩票--生产环境,删除console.log')
            // config.plugins.push(
            //     new UglifyJsPlugin({
            //         uglifyOptions: {
            //             compress: {
            //                 pure_funcs: ['console.log'] // 移除console
            //             },
            //         },
            //     }),
            // );
            // 为生产环境修改配置...
        } else {
            // console.log('开发环境')
            // 为开发环境修改配置...
        }
    },
    css: {
       
    },
    devServer: {
        proxy: {
            '/apis': {
                target:"http://legou890.com/",
                secure: true,          // 如果是https接口，需要配置这个参数
                changeOrigin: true,     //是否跨域
                pathRewrite: {
                    '^/apis': ''        //需要rewrite的,
                }
            },
        }
    }
}