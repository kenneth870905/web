import 循环选号 from './循环选号.js';

class 投注60 extends 循环选号 {

    constructor(玩法) {
        super();
        this.玩法 = 玩法
        this.code = 玩法.Code;
        this.list = [];
        this.手动输入 = ""
        this.手动list = []   //头部
        this.选号免重复 = false
        this.设置选号()
        this.设置手动头部();
        this.设置免重复()
    }
    设置选号_3(list) {
        return this.设置选号_2(list, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 11])
    }
    get 球组() {
        var iOdds = this.玩法.iOdds;
        var rowsZh = [
            { code: 'ZH_Dad', name: '总大' }, { code: 'ZH_Xio', name: '总小' }, { code: 'ZH_Dan', name: '总单' }, { code: 'ZH_Shg', name: '总双' },
            { code: 'ZH_WDad', name: '总尾大' }, { code: 'ZH_WXio', name: '总尾小' }
        ]
        var 选号2 = [
            { code: "QS_Sha", name: '上' }, { code: "QS_SXH", name: '和' }, { code: "QS_Xia", name: '下' }, { code: "QS_JShu", name: '奇' },
            { code: "QS_JOH", name: '和' }, { code: "QS_OShu", name: '偶' }
        ]
        var 选号3 = [{ key: 'Dad', name: '大' }, { key: 'Xio', name: '小' }, { key: 'Dan', name: '单' }, { key: 'Shg', name: '双' }]

        if (this.玩法.Code == 1) {
            var list = []
            list[0] = { name: "", notitle: true, style: '方形4', 选号: JSON.parse(JSON.stringify(rowsZh)) }
            list[1] = { name: "", notitle: true, style: '方形3', 选号: JSON.parse(JSON.stringify(选号2)) }
            list[0].选号.forEach(item => {
                item.赔率 = iOdds[item.code];
            });
            list[1].选号.forEach(item => {
                item.赔率 = iOdds[item.code]
            })
            var name = ['正码一', '正码二', '正码三', '正码四', '正码五'];
            for (let i = 0; i < name.length; i++) {
                var obj = { name: name[i], notitle: true, style: '方形4', 选号: JSON.parse(JSON.stringify(选号3)) }
                obj.选号.forEach(item => {
                    var code = 'No' + (i + 1) + '_' + item.key;
                    item.code = code;
                    item.赔率 = iOdds[code];
                })
                list.push(obj)
            }
            return list;
        } else if (this.玩法.Code == 2) {
            var list = []
            list[0] = { name: "", notitle: true, style: '方形4', 选号: [] };
            for (let i = 1; i < 12; i++) {
                var key = 'QWZY_' + (i < 10 ? '0' + i : i);
                var obj = {
                    code: key,
                    赔率: iOdds[key],
                    name: (i < 10 ? '0' + i : i)
                }
                list[0].选号.push(obj);
            }
            return list;
        } else if (this.玩法.Code == 10 || this.玩法.Code == 11 || this.玩法.Code == 12 || this.玩法.Code == 13 || this.玩法.Code == 14) {
            var list = [];
            list[0] = { name: "", notitle: true, style: '方形4', 选号: [] }
            list[1] = { name: "", notitle: true, style: '方形4', 选号: JSON.parse(JSON.stringify(选号3)) }
            list[2] = { name: "", notitle: true, style: '方形4', 选号: JSON.parse(JSON.stringify(rowsZh)) }
            var number = {
                10: 1,
                11: 2,
                12: 3,
                13: 4,
                14: 5
            }
            for (let i = 1; i < 12; i++) {
                var key = 'No' + number[this.玩法.Code] + '_' + (i < 10 ? '0' + i : i);
                var obj = {
                    code: key,
                    赔率: iOdds[key],
                    name: i < 10 ? '0' + i : i
                }
                list[0].选号.push(obj);
            }
            list[1].选号.forEach(item => {
                var code = 'No' + number[this.玩法.Code] + '_' + item.key
                item.code = code
                item.赔率 = iOdds[code]
            })
            list[2].选号.forEach(item => {
                item.赔率 = iOdds[item.code]
            })
            return list
        } else if (this.玩法.Code == 3) {
            var 龙虎 = [
                { key: '1V2', name: '一 VS 二' }, { key: '1V3', name: '一 VS 三' }, { key: '1V4', name: '一 VS 四' }, { key: '1V5', name: '一 VS 五' },
                { key: '2V3', name: '二 VS 三' }, { key: '2V4', name: '二 VS 四' }, { key: '2V5', name: '二 VS 五' }, { key: '3V4', name: '三 VS 四' },
                { key: '3V5', name: '三 VS 五' }, { key: '4V5', name: '四 VS 五' }
            ]
            var list = []
            list[0] = { name: "龙", notitle: false, style: '方形4', 选号: [] };
            list[1] = { name: "虎", notitle: false, style: '方形4', 选号: [] };
            龙虎.forEach(item => {
                var obj = {
                    code: 'LHD_' + item.key + '_Lg',
                    赔率: iOdds['LHD_' + item.key + '_Lg'],
                    name: item.name
                }
                list[0].选号.push(obj);
                var obj1 = {
                    code: 'LHD_' + item.key + '_Hu',
                    赔率: iOdds['LHD_' + item.key + '_Hu'],
                    name: item.name
                }
                list[1].选号.push(obj1);
            })
            return list;
        }


        var list = {
            300: () => this.设置选号_3(['第一位', '第二位', '第三位']),
            310: () => this.设置选号_3(['选号']),
            200: () => this.设置选号_3(['第一位', '第二位']),
            210: () => this.设置选号_3(['选号']),
            900: () => this.设置选号_3(['选号']),
            100: () => this.设置选号_3(['第一位', '第二位', '第三位', '第四位', '第五位']),
            401: () => this.设置选号_3(['一中一']),
            402: () => this.设置选号_3(['二中二']),
            403: () => this.设置选号_3(['三中三']),
            404: () => this.设置选号_3(['四中四']),
            405: () => this.设置选号_3(['五中五']),
            406: () => this.设置选号_3(['六中五']),
            407: () => this.设置选号_3(['七中五']),
            408: () => this.设置选号_3(['八中五'])
        }
        if (list[this.玩法.Code]) {
            return list[this.玩法.Code]()
        }
        return []
    }
    get 获取投注() {
        var list_1 = [];
        var list_4 = [];
        //主要用于官方玩法 
        var parentCode = [1,3]
        if (this.list.length > 0) {
            this.list.forEach(item => {
                let list_2 = item.选号.filter(x => x.active)
                let list_3 = [];
                list_2.forEach(x => {
                    // if(x.name.toString().includes('*')){
                    // list_3.push(x.name.toString()[0]);
                    // }else{
                    list_3.push(x.name);
                    // }
                    list_4.push(x)
                    if (parentCode.find(x => x == this.code)) {
                        x.parentkey = item.name
                    }
                })
                list_1.push(list_3.length > 0 ? list_3.join(',') : '_')
            })
        } else {
            this.手动list.forEach(item => {
                let list_2 = item.选号.filter(x => x.active)
                let list_3 = [];
                list_2.forEach(x => {
                    list_3.push(x.name);
                    list_4.push(x);
                })
                list_1.push(list_3.join(',') ? list_3.join(',') : '_')
            })
            list_1.push(this.手动输入)
        }
        return {
            str: list_1.join('|'),
            list: list_4
        }
    }
    get 官方玩法投注() {
        /**
        * [组合运算]
        * @param  {array} arr [进行组合运算的数组]
        * @example [1,3,2]
        * @param  {number} num [每几个元素为一组]
        * @return {array}     [返回组合集合]
        * @example [[1,3],[1,2],[3,2]]
        */
        var combo = function (arr, num) {
            var result = [];
            var range = function (r, _arr) {
                if (r.length == num) {
                    result.push(r)
                } else {
                    let l = r.length;
                    for (var i = 0, len = _arr.length - num + l; i <= len; i++) {
                        range(r.concat(_arr[i]), _arr.slice(i + 1))
                    }
                }
            }
            range([], arr);
            return result
        }

        var 组合list = {
            // 1: () => combo(this.获取投注.list, 2),
        }
        var 相乘code = [];
        var newlist = [];
        var 注数 = 0
        var 相乘赔率 = 0;
        // 合肖
        // if (this.code == 138) {
        //     var 赔率和 = 0;
        //     let name = []
        //     this.获取投注.list.forEach(x => {
        //         赔率和 += x.赔率
        //         name.push(x.name)
        //     })
        //     var 赔率 = (赔率和 / Math.pow(this.获取投注.list.length, 2)).toFixed(3);
        //     newlist.push({
        //         赔率: 赔率,
        //         name: name.join(',')
        //     })
        //     注数 = this.获取投注.list.length > 0 ? 1 : 0
        // } else if (this.code == 139) {
        //     var 赔率和 = 0;
        //     var length = this.list[0].选号.filter(x => !x.active).length
        //     let name = []
        //     this.list[0].选号.forEach(item => {
        //         if (!item.active) {
        //             赔率和 += item.赔率
        //         } else {
        //             name.push(item.name);
        //         }
        //     })
        //     var 赔率 = (赔率和 / Math.pow(length, 2)).toFixed(3);
        //     newlist.push({
        //         赔率: 赔率,
        //         name: name.join(',')
        //     })
        //     注数 = this.获取投注.list.length > 0 ? 1 : 0
        // } else if (组合list[this.code]) {
        //     var list_2 = 组合list[this.code]();
        //     list_2.forEach(item => {
        //         var name = [];
        //         item.forEach(x => name.push(x.name))
        //         var 赔率list = item.sort((x, y) => {
        //             return x.赔率 - y.赔率
        //         })
        //         newlist.push({
        //             name: name.join(','),
        //             赔率: 赔率list[0].赔率
        //         })
        //     })
        //     注数 = newlist.length
        // } else if (相乘code.find(x => x == this.code)) {
        //     newlist = this.获取投注.list
        //     // console.log(newlist)
        //     if (newlist.length > 0) {
        //         this.获取投注.list.forEach(item => {
        //             if (!相乘赔率) {
        //                 相乘赔率 = item.赔率
        //             } else {
        //                 相乘赔率 = item.赔率 * 相乘赔率
        //             }
        //         })
        //     }
        //     相乘赔率 = Math.round(相乘赔率 * 1000) / 1000
        //     注数 = newlist.length > 1 ? 1 : 0
        // } else {
        //     newlist = this.获取投注.list
        //     注数 = newlist.length
        // }
            newlist = this.获取投注.list
            注数 = newlist.length

        var 显示组数 = []
        var 显示赔率 = []
        return {
            list: this.获取投注.list,
            list_1: 组合list[this.code] ? 组合list[this.code]() : this.获取投注.list,
            newlist: newlist,
            注数: 注数,
            // 选号区
            显示组数: 显示组数.find(x => x == this.code) ? true : false,
            显示赔率: 显示赔率.find(x => x == this.code) ? true : false,
            // 确认弹框
            相乘赔率: 相乘赔率,
        }
    }
    设置免重复() {
        this.选号免重复 = this.code == 200
    }
    设置选号() {
        this.list = this.球组
    }
    设置机选() {
        if (this.list.length == 0) {
            var 随机组 = this.机选()
            var list1 = 随机组.slice(0, this.手动list.length);
            var list2 = 随机组.slice(this.手动list.length);
            console.log(list1, list2, 随机组);
            //手动输入头部
            for (let k = 0; k < this.手动list.length; k++) {
                for (let i = 0; i < this.手动list[k].选号.length; i++) {
                    this.手动list[k].选号[i].active = false
                    this.手动list[k].选号[i].active = list1[k].findIndex(x => x == i) != -1;
                }
            }
            //手动输入内容

            var 号码 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
            for (let i = 0; i < list2.length; i++) {
                // list2[i] 数组
                for (let k = 0; k < list2[i].length; k++) {
                    list2[i][k] = 号码[list2[i][k]];
                }
                list2[i] = list2[i].join(' ')
            }
            var str = list2.join('|');
            console.log(str, list2);
            this.手动输入 = str;
        } else {
            let 随机 = this.机选()
            console.log(随机)
            for (let k = 0; k < this.list.length; k++) {
                for (let i = 0; i < this.list[k].选号.length; i++) {
                    this.list[k].选号[i].active = false
                    this.list[k].选号[i].active = 随机[k].findIndex(x => x == i) != -1;
                }
            }
        }
    }
    机选() {
        var 随机整数_1 = (list, 免重复, 列数) => {
            console.log('生产随机数')
            var list_1 = [];
            var 随机列 = [];
            if (列数 && 列数 > 0) {
                for (let i = 0; i >= 0; i++) {
                    let n = Math.floor(Math.random() * (list.length - 1 - 0 + 1) + 0);
                    if (随机列.findIndex(x => x == n) == -1) {
                        随机列.push(n)
                    }
                    if (随机列.length == 列数) {
                        break;
                    }
                }
            }

            for (let i = 0; i < list.length; i++) {
                if (随机列.length > 0 && 随机列.findIndex(x => x == i) == -1) {
                    list_1.push([]);
                    console.log('结束_' + i)
                    continue;
                }
                var list_2 = []
                for (let k = 0; k >= 0; k++) {
                    let n = Math.floor(Math.random() * (list[i].max - 0 + 1) + 0);
                    let list_3 = [];
                    //每行免重复
                    if (免重复) {
                        for (let j = 0; j < i; j++) {
                            list_3 = [...list_3, ...list_1[j]]
                        }
                    }
                    if (list_2.findIndex(x => x == n) == -1 && list_3.findIndex(x => x == n) == -1) {
                        list_2.push(n)
                    }
                    if (list_2.length >= list[i].number) {
                        list_1.push(list_2);
                        break
                    }
                }
            }
            return list_1
        }
        var 随机列表 = {
            300: () => 随机整数_1([{ max: 10, number: 1 }, { max: 10, number: 1 }, { max: 10, number: 1 }], true),
            301: () => 随机整数_1([{ max: 10, number: 3 }], false),
            310: () => 随机整数_1([{ max: 10, number: 3 }], false),
            311: () => 随机整数_1([{ max: 10, number: 3 }], false),
            200: () => 随机整数_1([{ max: 10, number: 1 }, { max: 10, number: 1 }], true),
            201: () => 随机整数_1([{ max: 10, number: 2 }], false),
            210: () => 随机整数_1([{ max: 10, number: 2 }], false),
            211: () => 随机整数_1([{ max: 10, number: 2 }], false),
            900: () => 随机整数_1([{ max: 10, number: 1 }], false),
            100: () => 随机整数_1([{ max: 10, number: 1 }, { max: 10, number: 1 }, { max: 10, number: 1 }, { max: 10, number: 1 }, { max: 10, number: 1 }], true, 1),

            401: () => 随机整数_1([{ max: 10, number: 1 }], false),
            402: () => 随机整数_1([{ max: 10, number: 2 }], false),
            403: () => 随机整数_1([{ max: 10, number: 3 }], false),
            404: () => 随机整数_1([{ max: 10, number: 4 }], false),
            405: () => 随机整数_1([{ max: 10, number: 5 }], false),
            406: () => 随机整数_1([{ max: 10, number: 6 }], false),
            407: () => 随机整数_1([{ max: 10, number: 7 }], false),
            408: () => 随机整数_1([{ max: 10, number: 8 }], false),
            411: () => 随机整数_1([{ max: 10, number: 1 }], false),
            412: () => 随机整数_1([{ max: 10, number: 2 }], false),
            413: () => 随机整数_1([{ max: 10, number: 3 }], false),
            414: () => 随机整数_1([{ max: 10, number: 4 }], false),
            415: () => 随机整数_1([{ max: 10, number: 5 }], false),
            416: () => 随机整数_1([{ max: 10, number: 6 }], false),
            417: () => 随机整数_1([{ max: 10, number: 7 }], false),
            418: () => 随机整数_1([{ max: 10, number: 8 }], false),

            // 200:()=>随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 }] ,true ),
        }
        var code = this.code;
        if (随机列表[code]) {
            let 随机 = 随机列表[code]();
            return 随机
        }
        return []
    }
    get 手动输入提示() {
        var obj = {
            301: '请输入选号如：01 02 03,03 04 05 中间以“,”隔开',
            311: '请输入选号如：01 02 03,03 04 05 中间以“,”隔开',
            201: '请输入选号如：01 02,03 04 中间以“,”隔开',
            211: '请输入选号如：01 02,03 04 中间以“,”隔开',
            411: '请输入选号如：01,02 中间以“,”隔开',
            412: '请输入选号如：01 02,03 04 中间以“,”隔开',
            413: '请输入选号如：01 02 03,03 04 05 中间以“,”隔开',
            414: '请输入选号如：01 02 03 04,03 04 05 06 中间以“,”隔开',
            415: '请输入选号如：01 02 03 04 05,03 04 05 06 07 中间以“,”隔开',
            416: '请输入选号如：01 02 03 04 05 06,03 04 05 06 07 08 中间以“,”隔开',
            417: '请输入选号如：01 02 03 04 05 06 07,03 04 05 06 07 08 09 中间以“,”隔开',
            418: '请输入选号如：01 02 03 04 05 06 07 08,03 04 05 06 07 08 09 10 中间以“,”隔开',
        }
        return obj[this.code] ? obj[this.code] : '未设置提示语'
    }
    get 手动输入头部() {
        var obj = {
            // 127:()=>[
            //     { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
            // ]
        }
        return obj[this.code] ? obj[this.code]() : []
    }
    get 获取手动头部投注() {
        var list_1 = []
        this.手动list.forEach(item => {
            let list_2 = item.选号.filter(x => x.active)
            let list_3 = [];
            list_2.forEach(x => {
                list_3.push(x.name);
            })
            list_1.push(list_3.join(',') ? list_3.join(',') : '_')
        })
        return list_1.join('|')
    }
    设置手动头部() {
        this.手动list = this.手动输入头部
    }
    get 赔率() {
        if (typeof this.玩法.Odds == 'string') {
            return this.玩法三级.Odds
        } else if (typeof this.玩法三级.Odds == 'object') {
            // 例如 时时彩 龙虎 万千 玩法
            var this_1 = this;
            var list = JSON.parse(JSON.stringify(this.玩法三级.Odds));
            for (let i = 0; i < list.length; i++) {
                list[i] = list[i] * (100 - this_1.待确认投注.point) / 100
                list[i] = Math.round(list[i] * 1000) / 1000
            }
            return list
        }
    }
}

export default 投注60