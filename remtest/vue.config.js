module.exports={
    publicPath: './',
    // lintOnSave:true,
    lintOnSave: false,
    css:{
        extract: false,
        sourceMap:false,
        loaderOptions:{
            postcss:{
                plugins:[
                    require('postcss-pxtorem')({
                        rootValue:16,
                        selectorBlackList:[],
                        propList:['*'],
                        minPixelValue:2
                    })
                ]
            }
        }
    }
}