var date= new Date();
module.exports = {
    publicPath: './',
    // assetsDir: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    productionSourceMap: false,
    css: {
        extract: false
    },
    devServer: {
        proxy:"/",
        // open: process.platform === 'darwin',
        // host: '0.0.0.0',
        // port: 8080, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    },
}