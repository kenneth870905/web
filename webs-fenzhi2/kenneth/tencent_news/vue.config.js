// const path = require("path");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

// function resolve(dir){
// 	return path.join(__dirname, dir)
// }

module.exports = {
    publicPath: './',
    assetsDir: './',
    /**
    * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
    *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
    * */
    productionSourceMap: false,
    filenameHashing: true,

    // chainWebpack: config => {
    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')
    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // }),
    // },s
    lintOnSave: false,
    configureWebpack: config => {
        
    },
    css: {
        
        // extract: true,
        // sourceMap: false,
        // modules: false,
        loaderOptions: {
            sass: {
                data: '@import "~@/assets/css/style.scss";'
            }
        }
    },
    devServer: {
        proxy: {
            '/apis': {    //将www.exaple.com印射为/apis
                target: 'https://0698aa.com',
                // target: 'https://afcp08.com',
                // target:"http://10.10.27.180",
                // target: "http://10.10.27.31:82",     //虎哥
                // target: 'http://10.10.27.30:100',    // jin
                // target: 'http://10.10.27.121',       // 小段
                // target: 'http://10.10.27.122:82',       // 杜
                // target:'https://afcp08.com',
                secure: true,          // 如果是https接口，需要配置这个参数
                changeOrigin: true,     //是否跨域
                pathRewrite: {
                    '^/apis': ''        //需要rewrite的,
                }
            },
        }
    }
}