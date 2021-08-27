
const path = require('path');
var date= new Date();
module.exports = {
   
    publicPath: './',
    // assetsDir: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    productionSourceMap:false,
    css: {
        extract: false
    },
    devServer: {
        proxy: {
            '/apis': {
                // target:"https://afcp08.com",
                // target:"https://209190.com",
                target:'http://172.247.253.212:9527',
                secure: true,          // 如果是https接口，需要配置这个参数
                changeOrigin: true,     //是否跨域
                pathRewrite: {
                    '^/apis': ''        //需要rewrite的,
                }
            },
        }
    }
}