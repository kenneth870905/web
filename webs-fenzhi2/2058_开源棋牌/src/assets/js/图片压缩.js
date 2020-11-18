/*
 * @Description: In User Settings Edit
 * @Author: kenneth
 * @Date: 2019-09-13 20:44:01
 * @LastEditTime: 2019-09-14 12:42:02
 * @LastEditors: Please set LastEditors
 */

/**
 * @description: 通过改变图片尺寸压缩图片大
 * @param { quality: 0.1 比例 0-1 , size: 100 最大值 kb 只是参考实际不准确 } 
 * @return: 
 */
 
export default (fileObj,obj)=>{
    return new Promise((resolve, reject) => {
        var imgName = fileObj.name;
        var imgType = fileObj.type;
        var imgtype_1 = fileObj.type.substring(fileObj.type.indexOf('.')+1)
        var imgSize = fileObj.size / 1000;
        var 比例=1;
        // 是图片
        if (!imgtype_1.match(/.png|.jpg|.jpeg/)) {
            console.log('图片格式不对');
            resolve(fileObj);
            return
        }
        if(!obj){
            resolve(fileObj);
            return
        }
        if(obj.quality && obj.quality>0){
            比例 = obj.quality
        }else if(obj.size && obj.size < imgSize){
            比例 = obj.size / imgSize
        }
        if(比例==1){
            resolve(fileObj);
        }
        try {
            var reader = new FileReader();
            reader.readAsDataURL(fileObj);
            reader.onload = function (e) {
                var path = e.target.result
                var img = new Image();
                img.src = path;
                img.onload = function () {
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                        h = that.height,
                        scale = w / h;
                        w = obj.width || w;
                        h = obj.height || (w / scale);
                    var quality = 0.7;  // 默认图片质量为0.7
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                        anw.nodeValue = w ;
                    var anh = document.createAttribute("height");
                        anh.nodeValue = h ;
                        canvas.setAttributeNode(anw);
                        canvas.setAttributeNode(anh);
                        ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    // quality值越小，所绘制出的图像越模糊
                    // var base64 = canvas.toDataURL(imgType, quality);
                    var base64 = canvas.toDataURL(imgType,比例);

                    let dataurl = base64
                    let arr = dataurl.split(',')
                    let mime = arr[0].match(/:(.*?);/)[1]
                    let suffix = mime.split('/')[1]
                    let bstr = atob(arr[1])
                    let n = bstr.length
                    let u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    // var blob = new File([u8arr], `file.${suffix == 'jpeg' ? 'jpg' : 'png'}`, { type: mime })
                    var blob = new File([u8arr], imgName, { type: imgType })
                    resolve(blob);
                }
            }
        } catch (error) {
            resolve(fileObj);
        }
    });
}
