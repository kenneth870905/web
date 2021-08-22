const path = require('path');
const webpack = require('webpack')
var date= new Date();

module.exports = {
    publicPath: './',
    // assetsDir: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    css: {
        extract: false
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                axios:"axios"
            })
        ]
    }
}