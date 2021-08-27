
const path = require('path');
var date= new Date();
module.exports = {
   
    publicPath: './',
    // assetsDir: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    css: {
        extract: false,
        loaderOptions:{
            sass: {
                // https://webpack.docschina.org/loaders/sass-loader/#options
                // https://webpack.docschina.org/loaders/sass-loader/#additionaldata
                // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
                // additionalData: '@import "@/assets/style.scss";'
                prependData: '@import "@/assets/style.scss";'
            }
        }
    },
    devServer: {
        proxy: {
            '/apis': {
                target:"http://172.247.253.212:9527",
                // target:"https://209190.com",
                secure: true,          // 如果是https接口，需要配置这个参数
                changeOrigin: true,     //是否跨域
                pathRewrite: {
                    '^/apis': ''        //需要rewrite的,
                }
            },
        }
    }
}