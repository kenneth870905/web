
// yyyy年MM月dd日 hh:mm:ss
var formatDate = function (fmt , dateStr) {
    if (!dateStr) {
        var date=new Date();
    }else{
        if (typeof dateStr === "string") {
            if (dateStr.indexOf(".") > -1) {
                // 有些日期接口返回带有.0。
                dateStr = dateStr.substring(0, dateStr.indexOf("."));
            }
            // 解决IOS上无法从dateStr parse 到Date类型问题
            dateStr = dateStr.replace(/-/g, '/');
        }
        var date=new Date(dateStr);
    }
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export {
    formatDate
}