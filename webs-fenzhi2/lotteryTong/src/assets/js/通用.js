
//yyyy.MM.dd hh:mm
function 时间格式化(format, val) {
    const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    if (val) {
        if (val.toString().indexOf("-") > 0) {
            val = val
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "")
                .replace(/(-)/g, "/"); // 将 '-' 替换成 '/'
            if(val.indexOf(".")!=-1){
                val = val.slice(0, val.indexOf(".")); // 删除小数点及后面的数字
            }
        }
        var date = new Date(val);
    } else {
        var date = new Date();
    }
    date.setHours(date.getHours() + 8);
    const [whole, yy, MM, dd, hh, mm, ss] = date.toISOString().match(REGEX);
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const dates = new Date().getDate();
    if (format) {
        return format
            .replace("yyyy", yy)
            .replace("yy", yy.slice(2))
            .replace("MM", MM)
            .replace("dd", dd)
            .replace("hh", hh)
            .replace("mm", mm)
            .replace("ss", ss);
    } else {
        return [yy, MM, dd].join("-") + " " + [hh, mm, ss].join(":");
    }
}

function html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}

function escape2Html(str) {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

function number_format(number, decimals, dec_point, thousands_sep) {
    　　/*
    　　 * 参数说明：
    　　 * number：要格式化的数字
    　　 * decimals：保留几位小数
    　　 * dec_point：小数点符号
    　　 * thousands_sep：千分位符号
    　　 * */
    　　 number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    　　 var n = !isFinite(+number) ? 0 : +number,
    　　 prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
     　　sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
     　　dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
     　　s = '',
    　　 toFixedFix = function(n, prec) {
     　　　　var k = Math.pow(10, prec);
     　　　　return '' + Math.ceil(n * k) / k;
     　　};
    
     　　s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    　　 var re = /(-?\d+)(\d{3})/;
    　　 while(re.test(s[0])) {
     　　　　s[0] = s[0].replace(re, "$1" + sep + "$2");
     　　}
    
     　　if((s[1] || '').length < prec) {
        　　 s[1] = s[1] || '';
         　　s[1] += new Array(prec - s[1].length + 1).join('0');
     　　}
      　　　　return s.join(dec);
     }
function 开奖倒计时(item){
    function setVal() {
        item.Timer--;
        if (item.Timer <= 0) {
            //已到开奖时间
            item.showTimer = { h: '00', m: '00', s: '00' };
            clearInterval(item.setIntervalTimer);
            item.setIntervalTimer = null;
        }else {
            var h = '00' + Math.floor(item.Timer / 3600);
            var m = '00' + Math.floor((item.Timer / 60 % 60));
            var s = '00' + Math.floor((item.Timer % 60));
            item.showTimer = { h: h.substr(h.length - 2), m: m.substr(m.length - 2), s: s.substr(s.length - 2) };
        }
    }
    setVal();
    item.setIntervalTimer = setInterval(function () {
        setVal();
    }, 1000)
}

// 数组求最近值 返回索引值
function NextNumberArray(Number, NumberRangeArray){
    var w = 0;
    var c = -1;
    var abstand = 0;
    var l = NumberRangeArray.length;    
    for(var pos=0; pos < l; pos++){
        var n = NumberRangeArray[pos];
        abstand = (n < Number) ? Number - n : n - Number;
        if (c == -1){
            c = abstand;
            continue;
        }else if (abstand < c){
            c = abstand;
            w = pos;
        }
    }
    // return NumberRangeArray[w];
    return w;
}
  
export {
    时间格式化,
    html2Escape,
    escape2Html,
    number_format,
    开奖倒计时,
    NextNumberArray
};
