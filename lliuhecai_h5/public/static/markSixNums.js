(function ($) {
    $.base = $.base || {};
    $.base.markSixNums = {};

    var hongs = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"];
    var lans = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"];
    var lvs = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"];

    var colors = {
        "HO": { name: "红", list: hongs },
        "LA": { name: "蓝", list: lans },
        "LV": { name: "绿", list: lvs }
    };

    var wuxj = ["07", "08", "21", "22", "29", "30", "37", "38"];    //金
    var wuxm = ["03", "04", "11", "12", "19", "20", "33", "34", "41", "42", "49"];  //木
    var wuxs = ["09", "10", "17", "18", "25", "26", "39", "40", "47", "48"];        //水
    var wuxh = ["05", "06", "13", "14", "27", "28", "35", "36", "43", "44"];    //火
    var wuxt = ["01", "02", "15", "16", "23", "24", "31", "32", "45", "46"];        //土
    var wuxings = { "J": { name: "金", list: wuxj }, "M": { name: "木", list: wuxm }, "S": { name: "水", list: wuxs }, "H": { name: "火", list: wuxh }, "T": { name: "土", list: wuxt } };

    // var shengXiaoNameNow = 'A2';   //*****当前生肖
    // var shengXiaoNames = {
    //     "A1": { name: "牛" }, "A2": { name: "鼠" }, "A3": { name: "猪" }, "A4": { name: "狗" }, "A5": { name: "鸡" }, "A6": { name: "猴" },
    //     "A7": { name: "羊" }, "A8": { name: "马" }, "A9": { name: "蛇" }, "AA": { name: "龙" }, "AB": { name: "兔" }, "AC": { name: "虎" }
    // };
    var shengXiaoNameNow = 'A2';   //*****当前生肖
    var shengXiaoNames = {
        "A1": { name: "鼠" }, "A2": { name: "牛" }, "A3": { name: "虎" }, "A4": { name: "兔" }, "A5": { name: "龙" }, "A6": { name: "蛇" },
        "A7": { name: "马" }, "A8": { name: "羊" }, "A9": { name: "猴" }, "AA": { name: "鸡" }, "AB": { name: "狗" }, "AC": { name: "猪" }
    };
    var shengXiaoNameIndex = ["A1","A2","A3","A4","A5","A6", "A7", "A8", "A9", "AA", "AB", "AC"];

    var shengXiaoNums = [["01", "13", "25", "37", "49"], ["02", "14", "26", "38"], ["03", "15", "27", "39"],
    ["04", "16", "28", "40"], ["05", "17", "29", "41"], ["06", "18", "30", "42"], ["07", "19", "31", "43"],
    ["08", "20", "32", "44"], ["09", "21", "33", "45"], ["10", "22", "34", "46"], ["11", "23", "35", "47"], ["12", "24", "36", "48"]];

    var nums = {};
    for (var i = 1; i <= 49; i++) {
        var markSixNum = {};
        var numStr = ("0" + i).slice(-2);

        for (var colorCode in colors) {
            var colorObj = colors[colorCode];

            if (colorObj.list.indexOf(numStr) != -1) {
                markSixNum.color = colorObj.name;
                markSixNum.colorCode = colorCode;

                continue
            }
        }

        for (var wuCode in wuxings) {
            var wuObj = wuxings[wuCode];

            if (wuObj.list.indexOf(numStr) != -1) {
                markSixNum.wu = wuObj.name;
                markSixNum.wuCode = wuCode;

                continue
            }
        }

        nums[numStr] = markSixNum;
    }

    for (var i = 0; i < 12; i++) {
        var sxNumList = shengXiaoNums[i];
        var sxIndex = shengXiaoNameIndex.indexOf(shengXiaoNameNow);
        var sxName = shengXiaoNames[shengXiaoNameNow];

        for (var sxNum in sxNumList) {
            nums[sxNumList[sxNum]].sx = sxName.name;
            nums[sxNumList[sxNum]].sxCode = shengXiaoNameNow;
        }

        sxName.list = sxNumList;

        if (sxIndex <= 0)
            shengXiaoNameNow = 'AC';
        else
            shengXiaoNameNow = shengXiaoNameIndex[sxIndex - 1]
    }

    var weis = [];
    weis.push({ code: "1", list: ["01", "11", "21", "31", "41"] });
    weis.push({ code: "2", list: ["02", "12", "22", "32", "42"] });
    weis.push({ code: "3", list: ["03", "13", "23", "33", "43"] });
    weis.push({ code: "4", list: ["04", "14", "24", "34", "44"] });
    weis.push({ code: "5", list: ["05", "15", "25", "35", "45"] });
    weis.push({ code: "6", list: ["06", "16", "26", "36", "46"] });
    weis.push({ code: "7", list: ["07", "17", "27", "37", "47"] });
    weis.push({ code: "8", list: ["08", "18", "28", "38", "48"] });
    weis.push({ code: "9", list: ["09", "19", "29", "39", "49"] });
    weis.push({ code: "0", list: ["10", "20", "30", "40"] });

    $.base.markSixNums = {
        colors: colors,
        wus: wuxings,
        nums: nums,
        sx: shengXiaoNames,
        weiNums: weis
    };

})(window.jQuery || window.Zepto)