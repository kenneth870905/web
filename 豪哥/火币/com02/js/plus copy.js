$(function () {
    var i = 0;
    var shangge= $("#cssshang").find(".fen1");
    var xiage= $("#cssxia").find(".fen1");
    for (i;i<10;i++) {
        var xu=i+1;
        var xu1=i+11;
        shangge.append("<tr></tr>");
        xiage.append("<tr></tr>");
        var t=0;
        for (t;t<6;t++){
            var panh=5;
            if (t===1 || t===3 || t===4) {
                var panh=4;
            }else if(t===5){
                var panh=3;
            }
            var l=0;
            for (l;l<panh;l++){
                if (l===0 && (t===0 || t===2 || t===4)){
                    shangge.eq(t).find('tr').eq(i+2).addClass("zuobeijing");
                    xiage.eq(t).find('tr').eq(i+1).addClass("zuobeijing");
                    shangge.eq(t).find('tr').eq(i+2).append("<td>"+xu+"</td>");
                    xiage.eq(t).find('tr').eq(i+1).append("<td>"+xu1+"</td>");
                }else if((l===2 && (t===0 || t===2)) || (l===1 && (t===1 || t===3))){
                    shangge.eq(t).find('tr').eq(i+2).append("<td class=\"lirun\"></td>");
                    xiage.eq(t).find('tr').eq(i+1).append("<td class=\"lirun\"></td>");
                }else {
                    shangge.eq(t).find('tr').eq(i+2).append("<td></td>");
                    xiage.eq(t).find('tr').eq(i+1).append("<td></td>");
                }
            }
        }
    }


    function in_array(stringToSearch, arrayToSearch) { for (s = 0; s < arrayToSearch.length; s++) { thisEntry = arrayToSearch[s].toString(); if (thisEntry == stringToSearch) { return true; } } return false; }
    function qingqiuzu() {
        var zhuid = $("#zhuid").val();
        var fuid = $("#fuid").val();
        var mairuhui = $("#mairu").val();
        var maichuhui = $("#maichu").val();
        var shouxufei = $("#shouxu").val();
        var fuidarr=fuid.split("|");
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=1&currency=1&tradeType=sell&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                console.log(11111111111111)
                console.log(json)
                $.each(json, function(index1) {
                    var lnew=shangge.eq(0).find('tr').eq(index1+2);
                    lnew.find('td').eq(1).text(Math.floor(json[index1].price));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        var chajia=json[index1].price-$("#hulv4").text();
                        lnew.find('td').eq(2).text(chajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(2).text("00000");
                    }
                    lnew.find('td').eq(3).text(json[index1].tradeCount.toFixed(3));
                    var txtname=json[index1].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("landibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.addClass("zuobeijing");
                        lnew.find('td').eq(2).addClass("lirun");
                    }
                    lnew.find('td').eq(4).text(txtname);
                })
            }
        })
        //2
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=1&currency=1&tradeType=sell&currPage=2&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index2) {
                    var lnew=xiage.eq(0).find('tr').eq(index2+1)
                    lnew.find('td').eq(1).text(Math.floor(json[index2].price));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        var chajia=json[index2].price-$("#hulv4").text();
                        lnew.find('td').eq(2).text(chajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(2).text("00000");
                    }
                    lnew.find('td').eq(3).text(json[index2].tradeCount.toFixed(2));
                    var txtname=json[index2].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("landibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.addClass("zuobeijing");
                        lnew.find('td').eq(2).addClass("lirun");
                    }
                    lnew.find('td').eq(4).text(txtname);
                })
            }
        })
        //3
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=1&currency=1&tradeType=buy&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index3) {
                    var lnew=shangge.eq(1).find('tr').eq(index3+2)
                    lnew.find('td').eq(0).text(Math.floor(json[index3].price));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                       /* var maicajia=shangge.eq(0).find('tr').eq(index3+2).find('td').eq(1).text()-lnew.find('td').eq(0).text();*/
                        var maicajia=json[index3].price-$("#hulv2").text();
                        lnew.find('td').eq(1).text(maicajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(1).text("00000");
                    }
                    lnew.find('td').eq(2).text(json[index3].tradeCount.toFixed(2));
                    var txtname=json[index3].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.addClass("landibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.find('td').eq(1).addClass("lirun");
                    }
                    lnew.find('td').eq(3).text(txtname);
                })
            }
        })
        //4
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=1&currency=1&tradeType=buy&currPage=2&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index4) {
                    var lnew=xiage.eq(1).find('tr').eq(index4+1)
                    lnew.find('td').eq(0).text(Math.floor(json[index4].price));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        /*var maicajia=xiage.eq(0).find('tr').eq(index4+1).find('td').eq(1).text()-lnew.find('td').eq(0).text();*/
                        var maicajia=json[index4].price-$("#hulv2").text();
                        lnew.find('td').eq(1).text(maicajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(1).text("00000");
                    }
                    lnew.find('td').eq(2).text(json[index4].tradeCount.toFixed(2));
                    var txtname=json[index4].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.addClass("landibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.find('td').eq(1).addClass("lirun");
                    }
                    lnew.find('td').eq(3).text(txtname);
                })
            }
        })
        //5
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=3&currency=1&tradeType=sell&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index5) {
                    var lnew=shangge.eq(2).find('tr').eq(index5+2);
                    lnew.find('td').eq(1).text(json[index5].price.toFixed(2));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        var chajia=json[index5].price-$("#hulv4a").text();
                        lnew.find('td').eq(2).text(chajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(2).text("00000");
                    }
                    lnew.find('td').eq(3).text(json[index5].tradeCount.toFixed(2));
                    var txtname=json[index5].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("landibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.addClass("zuobeijing");
                        lnew.find('td').eq(2).addClass("lirun");
                    }
                    lnew.find('td').eq(4).text(txtname);
                })
            }
        })
        //6
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=3&currency=1&tradeType=sell&currPage=2&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index6) {
                    var lnew=xiage.eq(2).find('tr').eq(index6+1)
                    lnew.find('td').eq(1).text(json[index6].price.toFixed(2));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        var chajia=json[index6].price-$("#hulv4a").text();
                        lnew.find('td').eq(2).text(chajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(2).text("00000");
                    }
                    lnew.find('td').eq(3).text(json[index6].tradeCount.toFixed(2));
                    var txtname=json[index6].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("landibai");
                        lnew.find('td').eq(2).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.addClass("zuobeijing");
                        lnew.find('td').eq(2).addClass("lirun");
                    }
                    lnew.find('td').eq(4).text(txtname);
                })
            }
        })
        //7
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=3&currency=1&tradeType=buy&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index7) {
                    var lnew=shangge.eq(3).find('tr').eq(index7+2)
                    lnew.find('td').eq(0).text(json[index7].price.toFixed(2));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        /*var maicajia=shangge.eq(2).find('tr').eq(index7+2).find('td').eq(1).text()-lnew.find('td').eq(0).text();*/
                        var maicajia=json[index7].price-$("#hulv2a").text();
                        lnew.find('td').eq(1).text(maicajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(1).text("00000");
                    }
                    lnew.find('td').eq(2).text(json[index7].tradeCount.toFixed(2));
                    var txtname=json[index7].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.addClass("landibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.find('td').eq(1).addClass("lirun");
                    }
                    lnew.find('td').eq(3).text(txtname);
                })
            }
        })
        //8
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=3&currency=1&tradeType=buy&currPage=2&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index8) {
                    var lnew=xiage.eq(3).find('tr').eq(index8+1)
                    lnew.find('td').eq(0).text(json[index8].price.toFixed(2));
                    if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                        /*var maicajia=xiage.eq(2).find('tr').eq(index8+1).find('td').eq(1).text()-lnew.find('td').eq(0).text();*/
                        var maicajia=json[index8].price-$("#hulv2a").text();
                        lnew.find('td').eq(1).text(maicajia.toFixed(2));
                    }else {
                        lnew.find('td').eq(1).text("00000");
                    }
                    lnew.find('td').eq(2).text(json[index8].tradeCount.toFixed(2));
                    var txtname=json[index8].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.addClass("hongdibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.addClass("landibai");
                        lnew.find('td').eq(1).removeClass("lirun");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.find('td').eq(1).addClass("lirun");
                    }
                    lnew.find('td').eq(3).text(txtname);
                })
            }
        })
        //9
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=2&currency=1&tradeType=sell&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index9) {
                    var lnew=shangge.eq(4).find('tr').eq(index9+2);
                    lnew.find('td').eq(1).text(json[index9].price);
                    lnew.find('td').eq(2).text(json[index9].tradeCount.toFixed(2));
                    var txtname=json[index9].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("hongdibai");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("landibai");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.addClass("zuobeijing");
                    }
                    lnew.find('td').eq(3).text(txtname);
                })
            }
        })
        //10
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=2&currency=1&tradeType=sell&currPage=2&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index10) {
                    var lnew=xiage.eq(4).find('tr').eq(index10+1)
                    lnew.find('td').eq(1).text(json[index10].price);
                    lnew.find('td').eq(2).text(json[index10].tradeCount.toFixed(2));
                    var txtname=json[index10].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("hongdibai");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.removeClass("zuobeijing");
                        lnew.addClass("landibai");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                        lnew.addClass("zuobeijing");
                    }
                    lnew.find('td').eq(3).text(txtname);
                })
            }
        })
        //11
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=2&currency=1&tradeType=buy&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index11) {
                    var lnew=shangge.eq(5).find('tr').eq(index11+2);
                    lnew.find('td').eq(0).text(json[index11].price);
                    lnew.find('td').eq(1).text(json[index11].tradeCount.toFixed(2));
                    var txtname=json[index11].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.addClass("hongdibai");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.addClass("landibai");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                    }
                    lnew.find('td').eq(2).text(txtname);
                })
            }
        })
        //12
        $.ajax({type: "get",url:'https://otc-api-hk.eiijo.cn/v1/data/trade-market?',async:true,data: "coinId=2&currency=1&tradeType=buy&currPage=2&payMethod=0&country=37&blockType=general&online=1&range=0&amount=",success:function(msg)
            {
                var json=msg.data;
                $.each(json, function(index11) {
                    var lnew=xiage.eq(5).find('tr').eq(index11+1)
                    lnew.find('td').eq(0).text(json[index11].price);
                    lnew.find('td').eq(1).text(json[index11].tradeCount.toFixed(2));
                    var txtname=json[index11].userName.substring(0,7);
                    if (txtname === zhuid) {
                        lnew.addClass("hongdibai");
                    }else if (in_array(txtname,fuidarr)){
                        lnew.addClass("landibai");
                    }else{
                        lnew.removeClass("hongdibai");
                        lnew.removeClass("landibai");
                    }
                    lnew.find('td').eq(2).text(txtname);
                })
            }
        })

    }
    qingqiuzu();

    setInterval(function () {
        qingqiuzu();
    },4000)
    var li, mm
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
    diaoyongws();
    diaoyongws1();
    function diaoyongws() {
        var ws = new WebSocket("wss://api.huobiasia.vip/ws");
        //杩炴帴鎴愬姛鏃讹紝瑙﹀彂浜嬩欢
        ws.onopen = function () {
            //璇锋眰鍙傛暟
            var param = "{\"sub\": \"market.btcusdt.kline.1min\",\"id\": \"id10\"}";
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
                console.log(sshl);
                $("#hulv0").text(sshl.toFixed(2));
                if (mairuhui !="" && maichuhui !="" && shouxufei !=""){
                    var btcss1=sshl*mairuhui;
                    var btcss2=btcss1-btcss1*shouxufei;
                    var btcss3=sshl*maichuhui;
                    var btcss4=btcss3+btcss3*shouxufei;
                    $("#hulv1").text(btcss1.toFixed(2));
                    $("#hulv2").text(btcss2.toFixed(2));
                    $("#hulv3").text(btcss3.toFixed(2));
                    $("#hulv4").text(btcss4.toFixed(2));

                }


                /* $("#hulv1").val();*/

            }
        }
        // 鏂紑 web socket 杩炴帴鎴愬姛瑙﹀彂浜嬩欢
        ws.onclose = function () {
            diaoyongws();
        };
    }
    function diaoyongws1() {
        var ws = new WebSocket("wss://api.huobiasia.vip/ws");
        //杩炴帴鎴愬姛鏃讹紝瑙﹀彂浜嬩欢
        ws.onopen = function () {
            //璇锋眰鍙傛暟
            var param = "{\"sub\": \"market.ethusdt.kline.1min\",\"id\": \"id10\"}";
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

                }


                /* $("#hulv1").val();*/

            }
        }
        // 鏂紑 web socket 杩炴帴鎴愬姛瑙﹀彂浜嬩欢
        ws.onclose = function () {
            diaoyongws1();
        };
    }
})