var api_url = 'http://127.0.0.1' 
// var api_url = 'http://161.117.234.28'



function getToken(){
    var tmmUser = ''
        try {
            tmmUser = JSON.parse(localStorage.tmmUser);
        } catch (error) {
            return ''
        }
    return tmmUser.token
}

$.ajaxSetup({
    headers: {
        Authorization: 'bearer ' + getToken(),
    }
})

// 获取url参数
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


function isLoading(type){
    if(type){
        $('.Loading').addClass('open')
    }else{
        setTimeout(function(){
            $('.Loading').removeClass('open')            
        }, 500);
    }
}



