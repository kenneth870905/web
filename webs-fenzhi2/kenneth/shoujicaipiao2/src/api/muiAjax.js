export default {
    post:(url,data)=>{
        console.log(data);
        return new Promise((resolve, reject) => {
            mui.ajax(url,{
                data:data,
                // dataType:'json',//服务器返回json格式数据
                type:'post',//HTTP请求类型
                timeout:10000,//超时时间设置为10秒；
                crossDomain: true, //强制使用5+跨域  
                success:function(data){
                    console.log(data)
                    var r = {
                        data:data
                    }
                    resolve(r)
                },
                error:function(xhr,type,errorThrown){
                    reject(type)
                }
            }) 
        });
    }
}

