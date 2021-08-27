
import 循环选号 from './循环选号.js'

class 投注40 extends 循环选号 {
    constructor(玩法) {
        super();
        this.玩法 = 玩法
        this.code = 玩法.Code;
        this.list = [];
        this.手动输入 = ""
        this.手动list = []   //头部
        this.选号免重复=false
        this.设置选号()
        this.设置手动头部();
        this.设置免重复()
    }
    
    get 球组() {
        var iOdds = this.玩法.iOdds;
        if (this.玩法.Code == 1) {
            var 三中一 = [
                { name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }
            ]
            var 三同号 = [
                { code: "STH_N1", name: '1 1 1' }, { code: "STH_N2", name: '2 2 2' }, { code: "STH_N3", name: '3 3 3' }, { code: "STH_N4", name: '4 4 4' }, { code: "STH_N5", name: '5 5 5' }, { code: "STH_N6", name: '6 6 6' }, { code: "STH_All", name: "通选" }
            ]
            var list = [];
            list[0] = { name: "三中一", style: '方形3', 选号: JSON.parse(JSON.stringify(三中一)) }
            list[1] = { name: "三同号", style: '方形3', 选号: JSON.parse(JSON.stringify(三同号)) }
            list[0].选号.forEach(item => {
                item.code = 'SZY_N' + item.name;
                item.赔率 = iOdds['SZY_N' + item.name];
            });
            list[1].选号.forEach(item => {
                item.赔率 = iOdds[item.code]
            })
            return list;
        } else if (this.玩法.Code == 2) {
            var 二同号 = [
                { code: "ETH_N1", name: '1 1' }, { code: "ETH_N2", name: '2 2' }, { code: "ETH_N3", name: '3 3' }, { code: "ETH_N4", name: '4 4' }, { code: "ETH_N5", name: '5 5' }, { code: "ETH_N6", name: '6 6' }
            ]
            var 二不同 = [
                { code: "EBT_1_2", name: '1 2' }, { code: "EBT_1_3", name: '1 3' }, { code: "EBT_1_4", name: '1 4' },
                { code: "EBT_1_5", name: '1 5' }, { code: "EBT_1_6", name: '1 6' }, { code: "EBT_2_3", name: '2 3' },
                { code: "EBT_2_4", name: '2 4' }, { code: "EBT_2_5", name: '2 5' }, { code: "EBT_2_6", name: '2 6' },
                { code: "EBT_3_4", name: '3 4' }, { code: "EBT_3_5", name: '3 5' }, { code: "EBT_3_6", name: '3 6' },
                { code: "EBT_4_5", name: '4 5' }, { code: "EBT_4_6", name: '4 6' }, { code: "EBT_5_6", name: '5 6' }
            ]
            var list = [];
            list[0] = { name: "二同号", style: '方形3', 选号: JSON.parse(JSON.stringify(二同号)) }
            list[1] = { name: "二不同", style: '方形3', 选号: JSON.parse(JSON.stringify(二不同)) }
            list[0].选号.forEach(item => {
                item.赔率 = iOdds[item.code];
            });
            list[1].选号.forEach(item => {
                item.赔率 = iOdds[item.code]
            })
            return list;
        } else if (this.玩法.Code == 3) {
            var list = [];
            list[0] = { name: "和值", style: '方形3', 选号: [] }
            for (let i = 3; i <= 18; i++) {
                list[0].选号.push({
                    code: 'ZH_' + i,
                    name: i,
                    赔率: iOdds['ZH_' + i]
                })
            }
            list[0].选号.push({ code: "ZH_Dad", name: "大", 赔率: iOdds['ZH_Dad'] })
            list[0].选号.push({ code: "ZH_Xio", name: "小", 赔率: iOdds['ZH_Xio'] })
            return list;
        }
        var list = {
            220: () => this.设置选号_1(['号码'], 1, 6),
            222: () => this.设置选号_1(['胆码', '拖码'], 1, 6, true),
            200:()=>this.设置选号_3([
                    {"notitle":true,max:2,"style":1,"name":"二同号",list:[11,22,33,44,55,66]},
                    {"notitle":true,max:0,"style":1,"name":"不同号",list:[1,2,3,4,5,6]},
                ]),
            202: () => this.设置选号_2(['二同号'], ['11*', '22*', '33*', '44*', '55*', '66*']),
            310: () => this.设置选号_1(['号码'], 1, 6),
            300: () => this.设置选号_2(['三同号'], ['11*', '22*', '33*', '44*', '55*', '66*']),
            301: () => this.设置选号_2(['三同号'], ['111', '222', '333', '444', '555', '666']),
            333: () => this.设置选号_2(['号码'], ['123', '234', '345', '456'], true),
            600: () => this.设置选号_1([''], 3, 18, true),
        }
        if (list[this.玩法.Code]) {
            return list[this.玩法.Code]()
        }
        return []
    }
    get 获取投注() {
        var list_1 = [];
        var list_4 = [];
        if (this.list.length > 0) {
            this.list.forEach(item => {
                let list_2 = item.选号.filter(x => x.active)
                let list_3 = [];
                list_2.forEach(x => {
                    if(x.name.toString().includes('*')){
                        list_3.push(x.name.toString()[0]);
                    }else{
                        list_3.push(x.name);
                    }
                    list_4.push(x)
                })
                list_1.push(list_3.length>0 ? list_3.join(',') : '_')
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
    设置免重复(){
        this.选号免重复=this.code==200
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

            var 号码 = ['1', '2', '3', '4', '5', '6']
            for (let i = 0; i < list2.length; i++) {
                // list2[i] 数组
                for (let k = 0; k < list2[i].length; k++) {
                    list2[i][k] = 号码[list2[i][k]];
                }
                list2[i] = list2[i].join('')
            }
            var str = list2.join('|');
            console.log(str,list2);
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
            220: () => 随机整数_1([{ max: 5, number: 2 }], false),
            221: () => 随机整数_1([{ max: 5, number: 2 }], true),
            222: () => 随机整数_1([{ max: 5, number: 1 }, { max: 5, number: 1 }], true),
            200: () => 随机整数_1([{ max: 5, number: 1 },{ max: 5, number: 1 }], true),
            201: () => 随机整数_1([{ max: 5, number: 2 }], false),
            202: () => 随机整数_1([{ max: 5, number: 1 }], false),
            310: () => 随机整数_1([{ max: 5, number: 3 }], false),
            311: () => 随机整数_1([{ max: 5, number: 3 }], false),

            300: () => 随机整数_1([{ max: 5, number: 1 }], false),
            301: () => 随机整数_1([{ max: 5, number: 6 }], false),

            333: () => 随机整数_1([{ max: 3, number: 4 }], false),
            600: () => 随机整数_1([{ max: 15, number: 1 }], false),

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
            201: '请输入选号如：12,34 中间已“,”隔开',
            311: '请输入选号如：123,345 中间已“,”隔开',
            
            // 301:'请输入选号如：01 02 03,03 04 05 中间已“,”隔开',
        }
        return obj[this.code] ? obj[this.code] : '未设置提示语'
    }
    get 手动输入头部() {
        var obj = {
            // 127:()=>[
            //     { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
            // ],
            // 130:()=>[
            //     { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
            // ],
            // 135:()=>[
            //     { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
            // ],
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

export default 投注40;
