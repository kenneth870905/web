const path = require('path');
var webpack = require('webpack')

var date= new Date();

module.exports = {
    publicPath: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/style.scss";`
            }
        }
    },
    configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
        		vtime: `"?v=${date.getMonth()+1}${date.getDate()}${date.getHours()}"`
      		})
        ]
	}
}