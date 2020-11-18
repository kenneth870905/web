(function ($) {
    $.base.info.init2[70000] = init;
    $.base.info.init2[70001] = init;

    function init(lotteryCode) {
        var methods = $.base.info.methods2;
        methods[lotteryCode] = getMethodInputInfo;

        var getInputInfo = $.base.info.getInputInfo;
        var numInfo = $.base.markSixNums;

        $.base.info.length = 7;
        $.base.info.min = 1;
        $.base.info.max = 49;

        //特码玩法
        var tableSpRows1 = [
            [{ key: 'SP_Dan', name: '特单' }, { key: 'SP_Shg', name: '特双' }, { key: 'SP_Dad', name: '特大' }, { key: 'SP_Xio', name: '特小' }],
            [{ key: 'SP_HDan', name: '和单' }, { key: 'SP_HShg', name: '和双' }, { key: 'SP_HDad', name: '和大' }, { key: 'SP_HXio', name: '和小' }],
            [{ key: 'SP_ZhDan', name: '总单' }, { key: 'SP_ZhShg', name: '总双' }, { key: 'SP_ZhDad', name: '总大' }, { key: 'SP_ZhXio', name: '总小' }]
        ];

        var tableSpRows2 = [
            [{ key: 'SP_Dan', name: '特单' }, { key: 'SP_Shg', name: '特双' }, { key: 'SP_Dad', name: '特大' }, { key: 'SP_Xio', name: '特小' }, { key: 'SP_WDad', name: '尾大' }],
            [{ key: 'SP_HDan', name: '和单' }, { key: 'SP_HShg', name: '和双' }, { key: 'SP_HDad', name: '和大' }, { key: 'SP_HXio', name: '和小' }, { key: 'SP_WXio', name: '尾小' }],
            [{ key: 'SP_DadShg', name: '大双' }, { key: 'SP_XioShg', name: '小双' }, { key: 'SP_DadDan', name: '大单' }, { key: 'SP_XioDan', name: '小单' }, {}]
        ]

        //大小单双
        var tableZm16 = [
            { code: 'Dan', name: '单' }, { code: 'Shg', name: '双' }, { code: 'Dad', name: '大' }, { code: 'Xio', name: '小' },
            { code: 'HDan', name: '和单' }, { code: 'HShg', name: '和双' }, { code: 'HDad', name: '和大' }, { code: 'HXio', name: '和小' }
        ]

        //大小单双,尾，波色
        var tableZmW16 = [
            { code: 'Dan', name: '单' }, { code: 'Shg', name: '双' }, { code: 'Dad', name: '大' }, { code: 'Xio', name: '小' },
            { code: 'HDan', name: '和单' }, { code: 'HShg', name: '和双' }, { code: 'HDad', name: '和大' }, { code: 'HXio', name: '和小' },
            { code: 'WDad', name: '尾大' }, { code: 'WXio', name: '尾小' }, { code: 'HOB', name: '红波' }, { code: 'LVB', name: '绿波' }, { code: 'LAB', name: '蓝波' }
        ]

        var hoDan = $.map(numInfo.colors['HO'].list, function (e, index) { if (parseInt(e) % 2 != 0) return e; });
        var hoShg = $.map(numInfo.colors['HO'].list, function (e, index) { if (parseInt(e) % 2 == 0) return e; });
        var hoDad = $.map(numInfo.colors['HO'].list, function (e, index) { if (parseInt(e) >= 25) return e; });
        var hoXio = $.map(numInfo.colors['HO'].list, function (e, index) { if (parseInt(e) <= 24) return e; });
        var lvDan = $.map(numInfo.colors['LV'].list, function (e, index) { if (e != '49' && parseInt(e) % 2 != 0) return e; });
        var lvShg = $.map(numInfo.colors['LV'].list, function (e, index) { if (parseInt(e) % 2 == 0) return e; });
        var lvDad = $.map(numInfo.colors['LV'].list, function (e, index) { if (e != '49' && parseInt(e) >= 25) return e; });
        var lvXio = $.map(numInfo.colors['LV'].list, function (e, index) { if (parseInt(e) <= 24) return e; });
        var laDan = $.map(numInfo.colors['LA'].list, function (e, index) { if (parseInt(e) % 2 != 0) return e; });
        var laShg = $.map(numInfo.colors['LA'].list, function (e, index) { if (parseInt(e) % 2 == 0) return e; });
        var laDad = $.map(numInfo.colors['LA'].list, function (e, index) { if (parseInt(e) >= 25) return e; });
        var laXio = $.map(numInfo.colors['LA'].list, function (e, index) { if (parseInt(e) <= 24) return e; });

        var hoDadDan = $.map(numInfo.colors['HO'].list, function (e, index) { var numInt = parseInt(e); if (numInt % 2 != 0 && numInt >= 25) return e; });
        var hoDadShg = $.map(numInfo.colors['HO'].list, function (e, index) { var numInt = parseInt(e); if (numInt % 2 == 0 && numInt >= 25) return e; });
        var hoXioDan = $.map(numInfo.colors['HO'].list, function (e, index) { var numInt = parseInt(e); if (numInt <= 24 && numInt % 2 != 0) return e; });
        var hoXioShg = $.map(numInfo.colors['HO'].list, function (e, index) { var numInt = parseInt(e); if (numInt <= 24 && numInt % 2 == 0) return e; });

        var lvDadDan = $.map(numInfo.colors['LV'].list, function (e, index) { var numInt = parseInt(e); if (e != '49' && numInt % 2 != 0 && numInt >= 25) return e; });
        var lvDadShg = $.map(numInfo.colors['LV'].list, function (e, index) { var numInt = parseInt(e); if (numInt % 2 == 0 && numInt >= 25) return e; });
        var lvXioDan = $.map(numInfo.colors['LV'].list, function (e, index) { var numInt = parseInt(e); if (numInt <= 24 && numInt % 2 != 0) return e; });
        var lvXioShg = $.map(numInfo.colors['LV'].list, function (e, index) { var numInt = parseInt(e); if (numInt <= 24 && numInt % 2 == 0) return e; });

        var laDadDan = $.map(numInfo.colors['LA'].list, function (e, index) { var numInt = parseInt(e); if (numInt % 2 != 0 && numInt >= 25) return e; });
        var laDadShg = $.map(numInfo.colors['LA'].list, function (e, index) { var numInt = parseInt(e); if (numInt % 2 == 0 && numInt >= 25) return e; });
        var laXioDan = $.map(numInfo.colors['LA'].list, function (e, index) { var numInt = parseInt(e); if (numInt <= 24 && numInt % 2 != 0) return e; });
        var laXioShg = $.map(numInfo.colors['LA'].list, function (e, index) { var numInt = parseInt(e); if (numInt <= 24 && numInt % 2 == 0) return e; });

        //49个数字
        var tableNum49 = new Array();

        for (var i = 1; i <= 10; i++) {
            var cell = new Array();

            for (var c = 1; c <= 5; c++) {
                var numVal = (c - 1) * 10 + i;

                if (numVal != 50)
                    cell.push(("0" + numVal).slice(-2));
                else
                    cell.push(null);
            }

            tableNum49.push(cell);
        }
        //49个数的返回对象
        function getItemNum49(getKey) {
            return {
                type: 'numList',
                rows: tableNum49,
                getKey: getKey,
                getNum: function (num) {
                    return numInfo.nums[num]
                }
            }
        }

        //49个数字复选框
        function getItemNumCheck49(obj) {

            var getContent = null;

            if (obj.numMin) {
                getContent = function (values) {
                    if (Object.keys(values).length >= obj.numMin) {
                        var valList = new Array();

                        for (var item in values) {
                            if (values[item])
                                valList.push(values[item]);
                        }
                        var combinationList = Lottery.BetHelper.GetCombination(System.String, System.Array.init(valList, System.String), obj.numMin);
                        var contents = new Array();
                        $t = Bridge.getEnumerator(combinationList);

                        while ($t.moveNext()) {
                            var item = $t.Current;
                            var texts = Bridge.toArray(System.Linq.Enumerable.from(item).select(function (item) { return item.name })).join(', ');

                            contents.push({ text: texts });
                        }

                        return contents;
                    }

                    return [];
                }
            }

            return {
                type: 'numCk49',
                rows: tableNum49,
                getKey: obj.getKey,
                getContent: getContent,
                getNum: function (num) {
                    return numInfo.nums[num]
                }
            }
        }

        function getMethodInputInfo(method) {
            if (method.Code == 100) {
                //两面
                var items = [
                    {
                        type: 'tbh',
                        cells: 4,
                        head: true,
                        rows: tableSpRows1
                    },
                    {
                        type: 'totleTitle',
                        rows: tableZm16,
                        titles: ['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
                        getKey: function (code, c) {
                            return 'No' + c + '_' + code;
                        }
                    }
                ];

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 101 || method.Code == 102) {
                //特码AB
                var keyStr = method.Code == 101 ? 'A' : 'B';

                var items = [
                    getItemNum49(function (num) {
                        return keyStr + '_No' + num;
                    }),
                    {
                        type: 'tbh',
                        cells: 5,
                        head: false,
                        rows: tableSpRows2
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 103 || method.Code == 151 || method.Code == 152 || method.Code == 153 || method.Code == 154 || method.Code == 155 || method.Code == 156) {
                //正码，正码特1-6
                var numKey = { 103: 'ZM_', 151: 'ZMT1_', 152: 'ZMT2_', 153: 'ZMT3_', 154: 'ZMT4_', 155: 'ZMT5_', 156: 'ZMT6_' };
                var items = [
                    getItemNum49(function (num) {
                        return numKey[method.Code] + num;
                    })
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 105) {
                //正码1-6
                var items = [
                    {
                        type: 'totleTitle',
                        rows: tableZmW16,
                        titles: ['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
                        getKey: function (code, c) {
                            return 'No' + c + '_' + code;
                        }
                    }
                ];

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 106) {
                var zmStr = { "ZMGG1": '正码一', "ZMGG2": '正码二', "ZMGG3": '正码三', "ZMGG4": '正码四', "ZMGG5": '正码五', "ZMGG6": '正码六' };
                var zmDxds = {
                    'Dan': '单', 'Shg': '双', 'Dad': '大', 'Xio': '小', 'HDan': '和单', 'HShg': '和双', 'HDad': '和大',
                    'HXio': '和小', 'WDad': '尾大', 'WXio': '尾小', 'HOB': '红波', 'LVB': '绿波', 'LAB': '蓝波'
                };

                function getKey(code, c) {
                    return c + '_' + code;
                }

                var input =
                    {
                        type: 'zmra16',
                        rows: tableZmW16,
                        getKey: getKey,
                        getContent: function (values, oddList) {

                            var contents = new Array();
                            var count = Object.keys(values).length;

                            if (count > 1) {
                                var oddsTotal = 1;

                                for (var val in values) {
                                    var key = val + '_' + values[val];
                                    var odds = oddList[key];
                                    oddsTotal *= odds;
                                    contents.push({ model: '', odds: '', text: zmStr[val] + ' ' + zmDxds[values[val]] + ' @' + odds, val: val, input: input });
                                }

                                contents[0].model = count + ' 串 1';
                                contents[0].odds = oddsTotal.toFixed(3);
                            }

                            return contents;
                        }
                    };


                //正码过关
                var items = [input];

                return getInputInfo({ type: 'radio', items: items, getKey: getKey });
            }
            else if (method.Code == 107 || method.Code == 108 || method.Code == 109 || method.Code == 110) {
                //连肖
                var numKey = { 107: 'LS2_', 108: 'LS3_', 109: 'LS4_', 110: 'LS5_' };
                var numMin = { 107: 2, 108: 3, 109: 4, 110: 5 };
                var rows = new Array();
                var cell = new Array();
                var cellIndex = 0;
                for (var sxCode in numInfo.sx) {
                    var sxInfo = numInfo.sx[sxCode];
                    cell.push({ key: numKey[method.Code] + sxCode, name: sxInfo.name, nums: sxInfo.list });
                    cellIndex++;

                    if (cellIndex == 2) {
                        cellIndex = 0;
                        rows.push(cell);
                        cell = new Array();
                    }
                }


                var items = [
                    {
                        type: 'tableCk',
                        rows: rows,
                        getNum: function (num) {
                            return numInfo.nums[num]
                        },
                        getContent: function (values) {

                            if (Object.keys(values).length >= numMin[method.Code]) {
                                var contents = new Array();
                                var valList = new Array();
                                for (var item in values) {
                                    valList.push(values[item]);
                                }

                                var combinationList = Lottery.BetHelper.GetCombination(System.String, System.Array.init(valList, System.String), numMin[method.Code]);
                                var contents = new Array();
                                $t = Bridge.getEnumerator(combinationList);

                                while ($t.moveNext()) {
                                    var item = $t.Current;
                                    var minOdds = System.Linq.Enumerable.from(item).select(function (item) { return item.odds }).min();
                                    var texts = Bridge.toArray(System.Linq.Enumerable.from(item).select(function (item) { return item.name })).join(', ');

                                    contents.push({ text: texts, odds: minOdds });
                                }

                                return contents;
                            }

                            return [];
                        }
                    }
                ];

                return getInputInfo({ type: 'check', max: 6, items: items });
            }
            else if (method.Code == 111 || method.Code == 112 || method.Code == 113 || method.Code == 114) {
                var numKey = { 111: 'LWP2_', 112: 'LWP3_', 113: 'LWP4_', 114: 'LWP5_' };
                var numMin = { 111: 2, 112: 3, 113: 4, 114: 5 };

                //连尾
                var rows = new Array();
                var cell = new Array();
                var cellIndex = 0;
                for (var weiNum in numInfo.weiNums) {
                    var weiInfo = numInfo.weiNums[weiNum];
                    cell.push({ key: numKey[method.Code] + weiInfo.code, name: weiInfo.code, nums: weiInfo.list });
                    cellIndex++;

                    if (cellIndex == 2) {
                        cellIndex = 0;
                        rows.push(cell);
                        cell = new Array();
                    }
                }

                var items = [
                    {
                        type: 'tableCk',
                        rows: rows,
                        getNum: function (num) {
                            return numInfo.nums[num]
                        },
                        getContent: function (values) {

                            if (Object.keys(values).length >= numMin[method.Code]) {
                                var contents = new Array();
                                var valList = new Array();
                                for (var item in values) {
                                    valList.push(values[item]);
                                }

                                var combinationList = Lottery.BetHelper.GetCombination(System.String, System.Array.init(valList, System.String), numMin[method.Code]);
                                var contents = new Array();
                                $t = Bridge.getEnumerator(combinationList);

                                while ($t.moveNext()) {
                                    var item = $t.Current;
                                    var maxOdds = System.Linq.Enumerable.from(item).select(function (item) { return item.odds }).max();
                                    var texts = Bridge.toArray(System.Linq.Enumerable.from(item).select(function (item) { return item.name })).join(', ');

                                    contents.push({ text: texts, odds: maxOdds });
                                }

                                return contents;
                            }

                            return [];
                        }
                    }
                ];

                return getInputInfo({ type: 'check', max: 6, items: items });
            }
            else if (method.Code == 115 || method.Code == 116 || method.Code == 117 || method.Code == 118 || method.Code == 119 || method.Code == 120) {
                //连码
                var numKey = { 115: 'LM4Z_', 116: 'LM3Z_', 117: 'LM3Z2_', 118: 'LM2Z_', 119: 'LM2ZT_', 120: 'LMTC_' };
                var numMin = { 115: 4, 116: 3, 117: 3, 118: 2, 119: 2, 120: 2 };
                var items = [
                    getItemNumCheck49({
                        getKey: function (num) {
                            return numKey[method.Code] + num;
                        },
                        numMin: numMin[method.Code]
                    })
                ]

                return getInputInfo({ type: 'check', max: 10, items: items });
            }
            else if (method.Code == 121 || method.Code == 122 || method.Code == 123 || method.Code == 124 || method.Code == 125 || method.Code == 126 || method.Code == 127 || method.Code == 128) {
                //自选不中
                var numKey = { 121: 'ZBZ5_', 122: 'ZBZ6_', 123: 'ZBZ7_', 124: 'ZBZ8_', 125: 'ZBZ9_', 126: 'ZBZ10_', 127: 'ZBZ11_', 128: 'ZBZ12_' };
                var numMax = { 121: 10, 122: 10, 123: 10, 124: 11, 125: 12, 126: 13, 127: 13, 128: 14 };
                var numMin = { 121: 5, 122: 6, 123: 7, 124: 8, 125: 9, 126: 10, 127: 11, 128: 12 };

                var items = [
                    getItemNumCheck49({
                        getKey: function (num) {
                            return numKey[method.Code] + num;
                        },
                        numMin: numMin[method.Code]
                    })
                ]

                return getInputInfo({ type: 'check', max: numMax[method.Code], items: items });
            }
            else if (method.Code == 135 || method.Code == 136 || method.Code == 137) {
                //生肖
                var numKey = { 135: 'SP_', 136: 'ZMS_', 137: 'YS_' };

                var rows = new Array();
                var cell = new Array();
                var cellIndex = 0;
                for (var sxCode in numInfo.sx) {
                    var sxInfo = numInfo.sx[sxCode];
                    cell.push({ key: numKey[method.Code] + sxCode, name: sxInfo.name, nums: sxInfo.list });
                    cellIndex++;

                    if (cellIndex == 2) {
                        cellIndex = 0;
                        rows.push(cell);
                        cell = new Array();
                    }
                }

                var items = [
                    {
                        type: 'tbh',
                        cells: 2,
                        head: true,
                        title: '十二生肖',
                        rows: rows,
                        isNums: true
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 129 || method.Code == 130 || method.Code == 131 || method.Code == 132 || method.Code == 133 || method.Code == 134) {
                //中一
                var numKey = { 129: 'ZY5_', 130: 'ZY6_', 131: 'ZY7_', 132: 'ZY8_', 133: 'ZY9_', 134: 'ZY10_' };
                var numMax = { 129: 10, 130: 10, 131: 10, 132: 11, 133: 12, 134: 13 };
                var numMin = { 129: 5, 130: 6, 131: 7, 132: 8, 133: 9, 134: 10 };
                var items = [
                    getItemNumCheck49({
                        getKey: function (num) {
                            return numKey[method.Code] + num;
                        },
                        numMin: numMin[method.Code]
                    })
                ]

                return getInputInfo({ type: 'check', max: numMax[method.Code], items: items });
            }
            else if (method.Code == 138 || method.Code == 139) {
                //合肖
                var rows = new Array();
                var cell = new Array();
                var cellIndex = 0;
                for (var sxCode in numInfo.sx) {
                    var sxInfo = numInfo.sx[sxCode];
                    cell.push({ key: 'HS_' + sxCode, name: sxInfo.name, nums: sxInfo.list });
                    cellIndex++;

                    if (cellIndex == 2) {
                        cellIndex = 0;
                        rows.push(cell);
                        cell = new Array();
                    }
                }


                var items = [
                    {
                        type: 'tableCkNoOdds',
                        rows: rows,
                        getNum: function (num) {
                            return numInfo.nums[num]
                        },
                        getContent: function (values, iOdds) {
                            var count = Object.keys(values).length;

                            if (count) {
                                if (method.Code == 139) {
                                    //不中的赔率
                                    var oddsList = new Array();

                                    for (var item in iOdds) {
                                        oddsList.push(iOdds[item])
                                    }

                                    var maxOdds = System.Linq.Enumerable.from(oddsList).max();
                                    var minOdds = System.Linq.Enumerable.from(oddsList).min();

                                    var contents = new Array();
                                    var sumOdds = 0;
                                    for (var item in values) {
                                        contents.push(values[item].name);
                                        //如果存在最小赔率，排除掉
                                        if (minOdds == values[item].odds)
                                            minOdds = maxOdds;
                                    }

                                    //计算反向赔率
                                    for (var i = 0; i < 12 - count - 1; i++) {
                                        sumOdds += maxOdds;
                                    }
                                    sumOdds += minOdds;
                                    return [{
                                        odds: (sumOdds / Math.pow(12 - count, 2)).toFixed(3),
                                        text: contents.join(', ')
                                    }];
                                }
                                else {
                                    var contents = new Array();
                                    var sumOdds = 0;
                                    for (var item in values) {
                                        contents.push(values[item].name);
                                        sumOdds += values[item].odds;
                                    }

                                    return [{
                                        odds: (sumOdds / Math.pow(count, 2)).toFixed(3),
                                        text: contents.join(', ')
                                    }];
                                }
                            }

                            return [];
                        },
                        headTitle: '生肖'
                    }
                ];

                return getInputInfo({ type: 'check', max: method.Code == 139 ? 10 : 11, items: items });
            }
            else if (method.Code == 140) {
                //总肖
                var rows = [
                    [{ key: 'ZX2', name: '234肖' }, { key: 'ZX5', name: '5肖' }],
                    [{ key: 'ZX6', name: '6肖' }, { key: 'ZX7', name: '7肖' }],
                    [{ key: 'ZXD', name: '总肖单' }, { key: 'ZXS', name: '总肖双' }]
                ];

                var items = [
                    {
                        type: 'tbh',
                        cells: 2,
                        headTitle: '总肖',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 141) {
                //色波
                var rows = [
                    [{ key: 'SP_HOB', name: '红波' }, { key: 'SP_LAB', name: '蓝波' }, { key: 'SP_LVB', name: '绿波' }]
                ];

                var items = [
                    {
                        type: 'tbh',
                        cells: 3,
                        headTitle: '色波',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 142) {
                var rows = [
                    { key: 'SP_BHODan', name: '红单', color: 'HO', nums: hoDan },
                    { key: 'SP_BHOShg', name: '红双', color: 'HO', nums: hoShg },
                    { key: 'SP_BHODad', name: '红大', color: 'HO', nums: hoDad },
                    { key: 'SP_BHOXio', name: '红小', color: 'HO', nums: hoXio },
                    { key: 'SP_BLVDan', name: '绿单', color: 'LV', nums: lvDan },
                    { key: 'SP_BLVShg', name: '绿双', color: 'LV', nums: lvShg },
                    { key: 'SP_BLVDad', name: '绿大', color: 'LV', nums: lvDad },
                    { key: 'SP_BLVXio', name: '绿小', color: 'LV', nums: lvXio },
                    { key: 'SP_BLADan', name: '蓝单', color: 'LA', nums: laDan },
                    { key: 'SP_BLAShg', name: '蓝双', color: 'LA', nums: laShg },
                    { key: 'SP_BLADad', name: '蓝大', color: 'LA', nums: laDad },
                    { key: 'SP_BLAXio', name: '蓝小', color: 'LA', nums: laXio }
                ];

                var items = [
                    {
                        type: 'banBo',
                        title: '半波',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 143) {
                var rows = [
                    { key: 'SP_BHODadDan', name: '红大单', color: 'HO', nums: hoDadDan },
                    { key: 'SP_BHODadShg', name: '红大双', color: 'HO', nums: hoDadShg },
                    { key: 'SP_BHOXioDan', name: '红小单', color: 'HO', nums: hoXioDan },
                    { key: 'SP_BHOXioShg', name: '红小双', color: 'HO', nums: hoXioShg },
                    { key: 'SP_BLVDadDan', name: '绿大单', color: 'LV', nums: lvDadDan },
                    { key: 'SP_BLVDadShg', name: '绿大双', color: 'LV', nums: lvDadShg },
                    { key: 'SP_BLVXioDan', name: '绿小单', color: 'LV', nums: lvXioDan },
                    { key: 'SP_BLVXioShg', name: '绿小双', color: 'LV', nums: lvXioShg },
                    { key: 'SP_BLADadDan', name: '蓝大单', color: 'LA', nums: laDadDan },
                    { key: 'SP_BLADadShg', name: '蓝大双', color: 'LA', nums: laDadShg },
                    { key: 'SP_BLAXioDan', name: '蓝小单', color: 'LA', nums: laXioDan },
                    { key: 'SP_BLAXioShg', name: '蓝小双', color: 'LA', nums: laXioShg }
                ];

                var items = [
                    {
                        type: 'banBo',
                        title: '半半波',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 144) {
                //七色波
                var rows = [
                    [{ key: 'QSB_HO', name: '红波' }, { key: 'QSB_LA', name: '蓝波' }, { key: 'QSB_LV', name: '绿波' }, { key: 'QSB_HE', name: '和局' }]
                ];

                var items = [
                    {
                        type: 'tbh',
                        cells: 4,
                        headTitle: '七色波',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 145) {
                //特码头尾数
                var rows = [
                    [{ key: 'TWS_T0', name: '头0' }, { key: 'TWS_T1', name: '头1' }, { key: 'TWS_T2', name: '头2' }, { key: 'TWS_T3', name: '头3' }, { key: 'TWS_T4', name: '头4' }],
                    [{ key: 'TWS_W0', name: '尾0' }, { key: 'TWS_W1', name: '尾1' }, { key: 'TWS_W2', name: '尾2' }, { key: 'TWS_W3', name: '尾3' }, { key: 'TWS_W4', name: '尾4' }],
                    [{ key: 'TWS_W5', name: '尾5' }, { key: 'TWS_W6', name: '尾6' }, { key: 'TWS_W7', name: '尾7' }, { key: 'TWS_W8', name: '尾8' }, { key: 'TWS_W9', name: '尾9' }]
                ];

                var items = [
                    {
                        type: 'tbh',
                        cells: 5,
                        headTitle: '特码头尾数',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 146) {
                //正特尾数
                var rows = [
                    [{ key: 'ZTWS_W0', name: '尾0' }, { key: 'ZTWS_W1', name: '尾1' }],
                    [{ key: 'ZTWS_W2', name: '尾2' }, { key: 'ZTWS_W3', name: '尾3' }],
                    [{ key: 'ZTWS_W4', name: '尾4' }, { key: 'ZTWS_W5', name: '尾5' }],
                    [{ key: 'ZTWS_W6', name: '尾6' }, { key: 'ZTWS_W7', name: '尾7' }],
                    [{ key: 'ZTWS_W8', name: '尾8' }, { key: 'ZTWS_W9', name: '尾9' }]
                ];

                var items = [
                    {
                        type: 'tbh',
                        cells: 2,
                        headTitle: '特码头尾数',
                        rows: rows
                    }
                ]

                return getInputInfo({ type: 'input', items: items });
            }
            else if (method.Code == 147) {
                //七码五行
                var rowsQ = [
                    [{ key: 'QMWX_D0S', name: '单0 双7' }, { key: 'QMWX_D0X', name: '大0 小7' }],
                    [{ key: 'QMWX_D1S', name: '单1 双6' }, { key: 'QMWX_D1X', name: '大1 小6' }],
                    [{ key: 'QMWX_D2S', name: '单2 双5' }, { key: 'QMWX_D2X', name: '大2 小5' }],
                    [{ key: 'QMWX_D3S', name: '单3 双4' }, { key: 'QMWX_D3X', name: '大3 小4' }],
                    [{ key: 'QMWX_D4S', name: '单4 双3' }, { key: 'QMWX_D4X', name: '大4 小3' }],
                    [{ key: 'QMWX_D5S', name: '单5 双2' }, { key: 'QMWX_D5X', name: '大5 小2' }],
                    [{ key: 'QMWX_D6S', name: '单6 双1' }, { key: 'QMWX_D6X', name: '大6 小1' }],
                    [{ key: 'QMWX_D7S', name: '单7 双0' }, { key: 'QMWX_D7X', name: '大7 小0' }]
                ];

                var rows = new Array();
                var cell = new Array();
                for (var wuCode in numInfo.wus) {
                    var wuInfo = numInfo.wus[wuCode];
                    cell.push({ key: 'QMWX_WU' + wuCode, name: wuInfo.name, nums: wuInfo.list });

                    rows.push(cell);
                    cell = new Array();
                }

                var items = [
                    {
                        type: 'tbh',
                        cells: 2,
                        title: '七码',
                        head: true,
                        rows: rowsQ
                    },
                    {
                        type: 'tbh',
                        cells: 1,
                        head: true,
                        title: '五行',
                        rows: rows,
                        isNums: true
                    }
                ]



                return getInputInfo({ type: 'input', items: items });
            }

            return { type: '', items: [] };
        }
    }

})(window.jQuery || window.Zepto)