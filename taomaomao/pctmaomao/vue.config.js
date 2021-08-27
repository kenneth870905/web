
const path = require('path');
var date= new Date();
module.exports = {
   
    publicPath: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    
    productionSourceMap: false,
    filenameHashing: true,
    lintOnSave: false,
    css: {
        // extract: true,
        // sourceMap: false,
        // modules: false,
        extract: false
    },
    
}