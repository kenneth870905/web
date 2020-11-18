module.exports = {
    publicPath:'./',
    assetsDir:'./',
     /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
     *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * */
    productionSourceMap:false,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~@/assets/css/vw.scss";`
            }
        }
    },
    // 选项...
    // devServer: {
    //     proxy: 'http://10.10.27.122:8888'
    // },

    devServer: {
        proxy: {
            '/apis': {    //将www.exaple.com印射为/apis
                // target: 'https://0698aa.com',  // 接口域名
                // target:"http://10.10.27.180",
                // target:"http://10.10.27.31:82",
                target: 'http://10.10.27.30:100',  // jin
                // target: 'http://10.10.27.121',  // 小段
                // target: 'http://10.10.27.122:82',  // 
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