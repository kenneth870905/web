module.exports = {
    pwa: {                              // 浏览器图标
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    devServer: {
        // open: process.platform === 'darwin',
        // host: '127.0.0.1',
        port: 8081,
        // https: false,
        // hotOnly: false,
        // proxy: null, // 设置代理
        // before: app => {}
    }
}