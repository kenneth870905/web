
class 投注30 {
    constructor(玩法) {
        this.玩法 = 玩法
        this.code = 玩法.Code;
        this.list = [];
        this.手动输入 = ""
        this.手动list = []   //头部
        this.设置选号()
        this.设置手动头部();
    }
    设置选号_1(list, min, max, notitle) {
        let list1 = [];
        let 选号1 = [];
        for (let i = min; i <= max; i++) {
            选号1.push({
                name: i,
                active: false
            })
        }
        list.forEach(x => {
            list1.push({
                notitle: notitle ? notitle : false,
                style: 1,
                name: x,
                选号: JSON.parse(JSON.stringify(选号1))
                // 选号:选号1
            })
        });
        return list1
    }
    get 球组() {
        var codeList = {
            300: () => this.设置选号_1(['百位', '十位', '个位'], 0, 9),
            302: () => this.设置选号_1([''], 0, 27, true),
            303: () => this.设置选号_1(['组三'], 0, 9),
            304: () => this.设置选号_1(['组六'], 0, 9),

            200: () => this.设置选号_1(['十位', '个位'], 0, 9),
            202: () => this.设置选号_1([''], 0, 18, true),
            204: () => this.设置选号_1(['组选'], 0, 9),
            220: () => this.设置选号_1(['百位', '十位'], 0, 9),
            222: () => this.设置选号_1([''], 0, 18, true),
            224: () => this.设置选号_1(['组选'], 0, 9),


            227: () => this.设置选号_1(['组选'], 0, 9),
            100: () => this.设置选号_1(['百位', '十位', '个位'], 0, 9),
            120: () => this.设置选号_1(['不定胆'], 0, 9),
        }
        if (codeList[this.code]) {
            return codeList[this.code]();
        } else {
            return []
        }
    }
    get 获取投注() {
        var list_1 = [];
        var list_4 = [];
        if (this.list.length > 0) {
            this.list.forEach(item => {
                let list_2 = item.选号.filter(x => x.active)
                let list_3 = [];
                list_2.forEach(x => {
                    list_3.push(x.name);
                    list_4.push(x)
                })
                list_1.push(list_3.join(',') ? list_3.join(',') : '_')
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
            // return list_1.join('|')
        }
        return {
            str: list_1.join('|'),
            list: list_4
        }
    }
    设置选号() {
        this.list = this.球组
    }
    设置机选() {
        if (this.list.length == 0) {
            var 随机组 = this.机选()
            var list1 = 随机组.slice(0, this.手动list.length);
            var list2 = 随机组.slice(this.手动list.length);
            //手动输入头部
            for (let k = 0; k < this.手动list.length; k++) {
                for (let i = 0; i < this.手动list[k].选号.length; i++) {
                    this.手动list[k].选号[i].active = false
                    this.手动list[k].选号[i].active = list1[k].findIndex(x => x == i) != -1;
                }
            }
            //手动输入内容
            var 号码 = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']
            for (let i = 0; i < list2.length; i++) {
                // list2[i] 数组
                for (let k = 0; k < list2[i].length; k++) {
                    list2[i][k] = 号码[list2[i][k]];
                }
                list2[i] = list2[i].join('')
            }
            var str = list2.join('|');
            this.手动输入 = str;
        } else {
            let 随机 = this.机选()
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
                    // max 索引值 从0开始 比如 2 随机号为 0,1,2 之间一个
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
            300: () => 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 1 }, { max: 9, number: 1 }], true),
            301: () => 随机整数_1([{ max: 9, number: 3 }], false),
            302: () => 随机整数_1([{ max: 27, number: 1 }], false),
            303: () => 随机整数_1([{ max: 9, number: 2 }], false),
            304: () => 随机整数_1([{ max: 9, number: 3 }], false),
            200: () => 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 1 }], false),
            201: () => 随机整数_1([{ max: 9, number: 2 }], false),
            205: () => 随机整数_1([{ max: 9, number: 2 }], false),
            221: () => 随机整数_1([{ max: 9, number: 2 }], false),
            225: () => 随机整数_1([{ max: 9, number: 2 }], false),

            202: () => 随机整数_1([{ max: 18, number: 1 }], false),
            204: () => 随机整数_1([{ max: 9, number: 2 }], false),
            220: () => 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 1 }], false),
            222: () => 随机整数_1([{ max: 18, number: 1 }], false),
            224: () => 随机整数_1([{ max: 9, number: 2 }], false),
            100: () => 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 1 }, { max: 9, number: 1 }], false,1),
            120: () => 随机整数_1([{ max: 9, number: 1 }], false,1),
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
            305: '请输入选号如：123,345 中间以“,”隔开',
            301: '请输入选号如：123,345 中间以“,”隔开',
            201: '请输入选号如：12,34 中间以“,”隔开',
            205: '请输入选号如：12,34 中间以“,”隔开',
            221: '请输入选号如：12,34 中间以“,”隔开',
            225: '请输入选号如：12,34 中间以“,”隔开',
        }
        return obj[this.code] ? obj[this.code] : ''
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

export default 投注30