


Vue.config.devtools = true;
var app = new Vue({
    el: '#vue',
    data: {
        message: 'Hello Vue!',
        zhuid:"",
        fuid:"",
        mairuhui:"",
        maichuhui:"",
        shouxufei:"",

        hulv4:"00000",
        hulv2:"00000",
        hulv4a:"00000",
        hulv2a:"00000",
        mairu1:[{},{},{},{},{},{},{},{},{},{}],
        mairu11:[{},{},{},{},{},{},{},{},{},{}],
        maichu1:[{},{},{},{},{},{},{},{},{},{}],
        maichu11:[{},{},{},{},{},{},{},{},{},{}],

        mairu2:[{},{},{},{},{},{},{},{},{},{}],
        mairu21:[{},{},{},{},{},{},{},{},{},{}],
        maichu2:[{},{},{},{},{},{},{},{},{},{}],
        maichu21:[{},{},{},{},{},{},{},{},{},{}],

        mairu3:[{},{},{},{},{},{},{},{},{},{}],
        mairu31:[{},{},{},{},{},{},{},{},{},{}],
        maichu3:[{},{},{},{},{},{},{},{},{},{}],
        maichu31:[{},{},{},{},{},{},{},{},{},{}],
        
    },
    computed: {
        fuidarr:function(){
            return this.fuid.split('|')
        }
    },
    methods: {
        jisuan_lirun:function(item){
            var chajia = "0000"
            if (this.mairuhui !="" && this.maichuhui !="" && this.shouxufei !=""){
                // chajia=item.price-$("#hulv4").text();
                chajia=item.price-this.hulv4;
                chajia = chajia.toFixed(4)
            }
            return chajia
        },
        jisuan_lirun11:function(item){
            var chajia = "0000"
            if (this.mairuhui !="" && this.maichuhui !="" && this.shouxufei !=""){
                chajia=item.price-this.hulv2;
                chajia = chajia.toFixed(4)
            }
            return chajia
        },
        getClass1:function(item){
            var txtname=item.userName ? item.userName.substring(0,7) : null;
            var trclass = ''
            var tdclass = ''
            if (txtname === this.zhuid) {
                trclass = 'hongdibai'
            }else if (in_array(txtname,this.fuidarr)){
                trclass = 'landibai'
            }else{
                tdclass = 'lirun'
            }
            return {trclass:trclass , tdclass:tdclass}
        },
        // =============
        jisuan_lirun2:function(item){
            var chajia = "0000"
            if (this.mairuhui !="" && this.maichuhui !="" && this.shouxufei !=""){
                // chajia=item.price-$("#hulv4").text();
                chajia=item.price-this.hulv4a;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        jisuan_lirun21:function(item){
            var chajia = "0000"
            if (this.mairuhui !="" && this.maichuhui !="" && this.shouxufei !=""){
                chajia=item.price-this.hulv2a;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        getClass2:function(item){
            var txtname=item.userName ? item.userName.substring(0,7) : null;
            var trclass = ''
            var tdclass = ''
            if (txtname === this.zhuid) {
                trclass = 'hongdibai'
            }else if (in_array(txtname,this.fuidarr)){
                trclass = 'landibai'
            }else{
                tdclass = 'lirun'
            }
            return {trclass:trclass , tdclass:tdclass}
        },
        getClass3:function(item){
            var txtname=item.userName ? item.userName.substring(0,7) : null;
            var trclass = ''
            var tdclass = ''
            if (txtname === this.zhuid) {
                trclass = 'hongdibai'
            }else if (in_array(txtname,this.fuidarr)){
                trclass = 'landibai'
            }else{
                // tdclass = 'lirun'
            }
            return {trclass:trclass , tdclass:tdclass}
        },
    },
})
// 开始调用接口
var login_api = 'http://1.huobi456.com'
// var login_api = 'http://127.0.0.1'

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var token = getQueryVariable('token') ? getQueryVariable('token') : sessionStorage.token
if(!token){
    location.href = '../404.html'
}else{
    sessionStorage.token = token

    $.ajax({
        type: "post",
        url: login_api+"/huobi/public/index.php/user/getuserinfo?token="+token,
        dataType:"json",
        success: function (response) {
            console.log(response)
            var data = response
            if(data.code!=1){
                location.href = '../404.html'
            }
        },
        error:function(error){
            location.href = '../404.html'
        }
    });
}


function getall(){
    var zhuid = $("#zhuid").val();
    var fuid = $("#fuid").val();
    var mairuhui = $("#mairu").val();
    var maichuhui = $("#maichu").val();
    var shouxufei = $("#shouxu").val();
    var fuidarr=fuid.split("|");
    // 买入XRP
    $.ajax({
        type: "get",url: 'https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=7&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=',
        dataType: "json",
        success: function (response) {
            // console.log('买入BTC',response)
            var json = response.data;
            app.mairu1 = json
        }
    });
    $.ajax({
        type: "get",url: 'https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=7&currency=1&tradeType=sell&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=',
        // data: {url:},
        dataType: "json",
        success: function (response) {
            var json = response.data;
            app.mairu11 = json
        }
    });
     // 卖出XRP
    $.ajax({
        type: "get", url: 'https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=7&currency=1&tradeType=buy&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=',
        // data: {url:},
        dataType: "json",
        success: function (response) {
            // console.log('卖出BTC',response)
            var json = response.data;
            app.maichu1 = json
        }
    });
    $.ajax({
        type: "get", url: 'https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=7&currency=1&tradeType=buy&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=',
        // data: {url:},
        dataType: "json",
        success: function (response) {
            // console.log('卖出BTC',response)
            var json = response.data;
            app.maichu11 = json;
        }
    });
    // // 买入HT
    $.ajax({
        type: "get",url: 'https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=4&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=0&country=&blockType=general&online=1&range=0&amount=',
        // data: {url:},
        dataType: "json",
        success: function (response) {
            var json = response.data
            app.mairu2 = json
        }
    });
    $.ajax({
        type: "get",url: 'https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=4&currency=1&tradeType=sell&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=',
        // type: "get",url: '',
        // data: {url:},
        dataType: "json",
        success: function (response) {
            // console.log('买入eth',response)
            var json = response.data
            app.mairu21 = json
        }
    });
    // 卖出HT
    $.ajax({
        // type: "get",url: "https://otc-api.huobi.pr/v1/data/trade-market?coinId=5&currency=4&tradeType=buy&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
        type: "get",url: "https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=4&currency=1&tradeType=buy&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
        // data: {url:},
        dataType: "json",
        success: function (response) {
            // console.log('卖出ETH',response)
            var json = response.data;
            app.maichu2 = json
        }
    });
    $.ajax({
        type: "get",url: "https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=4&currency=1&tradeType=buy&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
        // data: {url:},
        dataType: "json",
        success: function (response) {
            // console.log('卖出ETH',response)
            var json = response.data;
            app.maichu21 = json
        }
    });
    
    // //买入USDT
    // $.ajax({
    //     type: "get",
    //     url: "https://otc-api.huobi.pr/v1/data/trade-market?coinId=2&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
    //     // data: {url:},
    //     dataType: "json",
    //     success: function (response) {
    //         // console.log('买入USDT',response)
    //         var json = response.data;
    //         app.mairu3 = json
           
    //     }
    // });
    // $.ajax({
    //     type: "get",
    //     url: "https://otc-api.huobi.pr/v1/data/trade-market?coinId=2&currency=1&tradeType=sell&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
    //     // data: {url:},
    //     dataType: "json",
    //     success: function (response) {
    //         // console.log('买入USDT',response)
    //         var json = response.data;
    //         app.mairu31 = json
    //     }
    // });
    // //卖出USDT
    // $.ajax({
    //     type: "get",
    //     url: "https://otc-api.huobi.pr/v1/data/trade-market?coinId=2&currency=1&tradeType=buy&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
    //     // data: {url:},
    //     dataType: "json",
    //     success: function (response) {
    //         // console.log('卖出USDT',response)
    //         var json = response.data;
    //         app.maichu3 = json
    //     }
    // });
    // $.ajax({
    //     type: "get",
    //     url: "https://otc-api.huobi.pr/v1/data/trade-market?coinId=2&currency=1&tradeType=buy&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=",
    //     // data: {url:},
    //     dataType: "json",
    //     success: function (response) {
    //         // console.log('卖出USDT',response)
    //         var json = response.data;
    //         app.maichu31 = json
    //     }
    // });
}

getall()
setInterval(() => {
    getall()
}, 1000 * 3.5);

function in_array(stringToSearch, arrayToSearch) { for (s = 0; s < arrayToSearch.length; s++) { thisEntry = arrayToSearch[s].toString(); if (thisEntry == stringToSearch) { return true; } } return false; }

function unzip(charData) {

    // 灏嗘暟瀛楁暟缁勮浆鎹㈡垚瀛楄妭鏁扮粍
    var binData = new Uint8Array(charData);

    // 瑙ｅ帇
    var data = pako.inflate(binData);

    // 灏咷unZip ByTAREAR杞崲鍥濧SCII瀛楃涓�
    key = String.fromCharCode.apply(null, new Uint16Array(data));

    //unescape(str)  --->瑙ｅ帇鍚庤В鐮侊紝闃叉涓崍涔辩爜
    return unescape(key);
}
function diaoyongws() {
    var ws = new WebSocket("wss://api.huobiasia.vip/ws");
    //杩炴帴鎴愬姛鏃讹紝瑙﹀彂浜嬩欢
    ws.onopen = function () {
        //璇锋眰鍙傛暟
        var param = "{\"sub\": \"market.xrpusdt.kline.1min\",\"id\": \"id10\"}";
        // 浣跨敤 send() 鏂规硶鍙戦€佹暟鎹� ;
        ws.send(param);
    }
    //鎺ユ敹鍒版湇鍔＄鍝嶅簲鐨勬暟鎹椂锛岃Е鍙戜簨浠�
    ws.onmessage = function (evt) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(evt.data, "utf-8")
        reader.onload = function (e) {
            li = new Uint8Array(reader.result.slice());
            var mairuhui=$("#mairu").val();
            var maichuhui=$("#maichu").val();
            var shouxufei=$("#shouxu").val();
            var json=unzip(li);
            var jsona=JSON.parse(json);
            var sshl=jsona.tick ? jsona.tick.close : 0;
            if(!jsona.tick){
                return
            }
            // console.log('__________',sshl);
            $("#hulv0").text(sshl.toFixed(2));
            if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                var btcss1=sshl*mairuhui;
                var btcss2=btcss1-btcss1*shouxufei;
                var btcss3=sshl*maichuhui;
                var btcss4=btcss3+btcss3*shouxufei;
                $("#hulv1").text(btcss1.toFixed(4));
                $("#hulv2").text(btcss2.toFixed(4));
                $("#hulv3").text(btcss3.toFixed(4));
                $("#hulv4").text(btcss4.toFixed(4));
                app.hulv4 = btcss4.toFixed(4)
                app.hulv2 = btcss2.toFixed(4)
            }
            /* $("#hulv1").val();*/
        }
    }
    // 鏂紑 web socket 杩炴帴鎴愬姛瑙﹀彂浜嬩欢
    ws.onclose = function () {
        console.log('断开连接')
        diaoyongws();
    };
}

diaoyongws()

function diaoyongws1() {
    var ws = new WebSocket("wss://api.huobiasia.vip/ws");
    //杩炴帴鎴愬姛鏃讹紝瑙﹀彂浜嬩欢
    ws.onopen = function () {
        //璇锋眰鍙傛暟
        var param = "{\"sub\": \"market.htusdt.kline.1min\",\"id\": \"id10\"}";
        // 浣跨敤 send() 鏂规硶鍙戦€佹暟鎹� ;
        ws.send(param);
    }
    //鎺ユ敹鍒版湇鍔＄鍝嶅簲鐨勬暟鎹椂锛岃Е鍙戜簨浠�
    ws.onmessage = function (evt) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(evt.data, "utf-8")
        reader.onload = function (e) {
            li = new Uint8Array(reader.result.slice());
            var mairuhui=$("#mairu").val();
            var maichuhui=$("#maichu").val();
            var shouxufei=$("#shouxu").val();
            var json=unzip(li);
            var jsona=JSON.parse(json);
            var sshl=jsona.tick ? jsona.tick.close : 0;
            if(!jsona.tick){
                return
            }
            // console.log(1111111111111,sshl)
            $("#hulv0a").text(sshl.toFixed(2));
            if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                var btcss1=sshl*mairuhui;
                var btcss2=btcss1-btcss1*shouxufei;
                var btcss3=sshl*maichuhui;
                var btcss4=btcss3+btcss3*shouxufei;
                $("#hulv1a").text(btcss1.toFixed(2));
                $("#hulv2a").text(btcss2.toFixed(2));
                $("#hulv3a").text(btcss3.toFixed(2));
                $("#hulv4a").text(btcss4.toFixed(2));
                app.hulv4a = btcss4.toFixed(2);
                app.hulv2a = btcss2.toFixed(2);
            }
            /* $("#hulv1").val();*/
        }
    }
    // 鏂紑 web socket 杩炴帴鎴愬姛瑙﹀彂浜嬩欢
    ws.onclose = function () {
        diaoyongws1();
    };
}

diaoyongws1()


