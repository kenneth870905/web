var fs = require('fs');
const path = require('path')
    // 引入七牛模块  
var qiniu = require("qiniu");
// const { remote } = require('electron');
// 图片上传
function upload(imgData) {
    console.log(qiniu)
    //要上传的空间名
    var bucket = 'cszh-project';
    var imageUrl = 'jsmx.viveducd.com'; // 域名名称
    var accessKey = 'Ah_0dn_bFbiELmhv_-LAUkkx16fiC56cA71mbQJa';
    var secretKey = 'yrRK3rnceY_g7ynzE_A-48niWcKOTlhkkmc8TLxr';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;

    return new Promise((resolve, reject) => {
        // router.post('/upload', function(req, res, next){
        // 图片数据流
        // var imgData = req.body.imgData;
        // 构建图片名
        var fileName = Date.now() + '.png';
        // 构建图片路径
        let configDir = remote.app.getPath('userData');
        var filePath = path.join(configDir, fileName)
        console.log(filePath)
        // win.loadFile(path.join(__dirname, 'pz1112/index.html'))
        //过滤data:URL
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        console.log(1)
        var dataBuffer = new Buffer(base64Data, 'base64');
        console.log(dataBuffer)
        fs.writeFile(filePath, dataBuffer, function (err) {
            console.log(1111111111111111111111111)
            if (err) {
                console.log({ status: '102', msg: '文件写入失败' })
                reject({ status: '102', msg: '文件写入失败' }) 
            } else {
                console.log('上传前111')
                var localFile = filePath;
                var formUploader = new qiniu.form_up.FormUploader(config);
                var putExtra = new qiniu.form_up.PutExtra();
                var key = fileName;
                // 文件上传
                console.log('上传前')

                formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
                    console.log('上传后')
                    // 上传之后删除本地文件
                    fs.unlinkSync(filePath);
                    

                    if (respErr) {
                        console.log({ status: '-1', msg: '上传失败', error: respErr })
                        reject({ status: '-1', msg: '上传失败', error: respErr })
                    }
                    if (respInfo.statusCode == 200) {
                        var imageSrc = imageUrl + '/' + respBody.key;
                        // console.log({ status: '200', msg: '上传成功', imageUrl: imageSrc })
                        resolve({ status: '200', msg: '上传成功', imageUrl: imageSrc })
                    } else {
                        // console.log({ status: '-1', msg: '上传失败', error: JSON.stringify(respBody) })
                        reject({ status: '-1', msg: '上传失败', error: JSON.stringify(respBody) })
                    }
                });
            }
        });
    });
}
