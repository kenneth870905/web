var date= new Date();

module.exports = {
    publicPath: './',
    assetsDir:`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`,
    css: {
      extract: false
    }
};