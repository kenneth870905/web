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
    css: {
        extract: false
    }
}