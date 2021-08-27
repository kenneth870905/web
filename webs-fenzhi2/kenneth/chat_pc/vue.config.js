var date = new Date();
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
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "~@/assets/css/vw.scss";'
            }
        }
    },
    // 选项...
    devServer: {
        port: 8081,
        proxy: {
            '/apis': {    //将www.exaple.com印射为/apis
                // target: 'https://0698aa.com',
                // target: 'http://10.10.27.30:100',  // jin
                // target: "https://afcp08.com",
                // target: 'http://10.10.27.31:82',  // 接口域名
                // target: 'http://10.10.27.121',  // 小段
                target: 'http://10.10.27.122:82',  // .net 杜   
                secure: false,          // 如果是https接口，需要配置这个参数
                changeOrigin: true,     //是否跨域
                pathRewrite: {
                    '^/apis': ''        //需要rewrite的,
                }
            }

        }
    },

}