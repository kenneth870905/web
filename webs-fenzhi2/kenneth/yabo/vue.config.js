const webpack = require('webpack')
// const baseUrl = process.env.NODE_ENV === 'production' ? '../' : '/';
const baseUrl = '/';
var date= new Date();
module.exports = {
    publicPath: "./",
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    productionSourceMap:false,
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             prependData: `$baseUrl: "${baseUrl}";`
    //         }
    //     }
    // },
    devServer: {
        proxy: {
            '/apis': {
                target: 'https://0698aa.com',
                // ws: true,
                changeOrigin: true,     // 是否跨域
                // secure:true,        // 如果是https接口，需要配置这个参数
            },
        }
    },
}