class 时时彩配置 {
    constructor(玩法) {
        this.玩法 = 玩法;
        this.code = 玩法.Code;
        this.汉字配置 = {
            Dad: '大',
            Dan: "单",
            Shg: "双",
            Xio: "小",
            ZhDan:'总单',
            ZhShg:'总双',
            ZhDad:'总大',
            ZhXio:'总小'
        },
        this.list = [];
        this.手动输入=""
        this.手动list=[]   //头部
        this.设置选号()
        this.设置手动头部();
    }
    设置选号1(list, min, max, notitle) {
        // console.log('设置号码1')
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
    设置选号20(list, min, max, notitle) {
        let list1 = [];
        let 选号1 = [];
        for (let i = min; i <= max; i++) {
            选号1.push({
                name: i < 10 ? '0' + i : i,
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
    // 方形样式5
    设置选号5(type,type2,type3,number){
        var n = number ? number : 1
        var list=[]
        for (let j = 0; j < type2.length; j++) {
            for (let i = 0; i < type.length; i++) {
                let obj={
                        name:type2[j],
                        赔率:this.玩法.Odds,
                        code:'No'+(i+n)+'_'+type3[j],
                        parentName:type[i]
                    }
                list.push(obj)
            }
        }
        return list
    }
    get 球组() {
        //大小单双
        var tableZmDxds = [
            { code: 'Dad', name: '大' }, { code: 'Xio', name: '小' }, { code: 'Dan', name: '单' }, { code: 'Shg', name: '双' }
        ]
        var 龙虎 = [
            { code: 'WQ', name: '万千' }, { code: 'WB', name: '万百' }, { code: 'WS', name: '万十' }, { code: 'WG', name: '万个' },
            { code: 'QB', name: '千百' }, { code: 'QS', name: '千十' }, { code: 'QG', name: '千个' }, { code: 'BS', name: '百十' },
            { code: 'BG', name: '百个' }, { code: 'SG', name: '十个' }
        ]
        var 前中后三 = [
            { key: 'QSan_BZ', name: '前三豹子' }, { key: 'ZSan_BZ', name: '中三豹子' }, { key: 'HSan_BZ', name: '后三豹子' },
            { key: 'QSan_SZ', name: '前三顺子' }, { key: 'ZSan_SZ', name: '中三顺子' }, { key: 'HSan_SZ', name: '后三顺子' },
            { key: 'QSan_DZ', name: '前三对子' }, { key: 'ZSan_DZ', name: '中三对子' }, { key: 'HSan_DZ', name: '后三对子' },
            { key: 'QSan_ZL', name: '前三杂六' }, { key: 'ZSan_ZL', name: '中三杂六' }, { key: 'HSan_ZL', name: '后三杂六' },
            { key: 'QSan_BS', name: '前三半顺' }, { key: 'ZSan_BS', name: '中三半顺' }, { key: 'HSan_BS', name: '后三半顺' }
        ]
        var 总和 = [{ key: 'No_ZhDan', name: '总单' }, { key: 'No_ZhShg', name: '总双' }, { key: 'No_ZhDad', name: '总大' }, { key: 'No_ZhXio', name: '总小' }];
        if (this.code == 4) {
            var list = [];
            var iOdds = this.玩法.iOdds;
            var 星 = { 'No1': '第一星', 'No2': '第二星', 'No3': '第三星', 'No4': '第四星', 'No5': '第五星', 'No': '总和' }
            for (const key in iOdds) {
                var t1 = key.substring(0, key.indexOf('_'));
                var t2 = key.substring(key.indexOf('_') + 1)
                var obj = list.find(x => x.key == t1);
                if (obj) {
                    obj.选号.push({ 'name': this.汉字配置[t2], '赔率': iOdds[key], 'active': false ,code: key})
                } else {
                    let obj1 = {
                        key: t1,
                        style: '方形4',
                        name: 星[t1],
                        选号: [
                            { 'name': this.汉字配置[t2], '赔率': iOdds[key], 'active': false ,code: key }
                        ],
                    };
                    list.push(obj1);
                }
            }
            return list
        } else if (this.code == 1) {
            var list=[]
                list[0]={
                    style:'方形5', 
                    选号:this.设置选号5(['第一名','第二名','第三名','第四名','第五名'] ,['0','1','2','3','4','5','6','7','8','9'] , ['0','1','2','3','4','5','6','7','8','9']),
                    name:['第一名','第二名','第三名','第四名','第五名']
                }
            return list;
        } else if (this.code == 2) {
            var list = [];
            list[0] = {
                name: "",    //前中后
                style: '方形3',
                选号: JSON.parse(JSON.stringify(前中后三))
            }
            for (let i = 0; i < list[0].选号.length; i++) {
                let key = list[0].选号[i].key;
                list[0].选号[i].赔率 = this.玩法.iOdds[key];
                list[0].选号[i].acitve = false;
                list[0].选号[i].code = key;
            }
            list[1] = {
                name: "总和",
                style: '方形4',
                选号: JSON.parse(JSON.stringify(总和))
            }
            for (let i = 0; i < list[1].选号.length; i++) {
                let key = list[1].选号[i].key;
                list[1].选号[i].赔率 = this.玩法.iOdds[key];
                list[1].选号[i].acitve = false;
                list[1].选号[i].code = key
            }
            list[2] = {
                name: "全5中1",
                style: '方形4',
                选号: []
            }
            for (let i = 0; i <= 9; i++) {
                let key = 'QWZY_' + i
                var obj = {
                    name: i,
                    赔率: this.玩法.iOdds[key],
                    code:key
                }
                list[2].选号.push(obj)
            }
            return list;
        } else if (this.code == 3) {
            var list = [];
            list[0] = { name: "龙", style: '方形4', 选号: JSON.parse(JSON.stringify(龙虎)) }
            list[1] = { name: "虎", style: '方形4', 选号: JSON.parse(JSON.stringify(龙虎)) }
            list[2] = { name: "和", style: '方形4', 选号: JSON.parse(JSON.stringify(龙虎)) }
            list[0].选号.forEach(item => {
                var key = 'LHD_' + item.code + '_Lg'
                item.赔率 = this.玩法.iOdds[key]
                item.code = key
            })
            list[1].选号.forEach(item => {
                var key = 'LHD_' + item.code + '_Hu'
                item.赔率 = this.玩法.iOdds[key]
                item.code = key
            })
            list[2].选号.forEach(item => {
                var key = 'LHD_' + item.code + '_He'
                item.赔率 = this.玩法.iOdds[key]
                item.code = key
            })
            return list
        } else {
            var 设置选号1 = this.设置选号1
            var codeList = {
                500: ()=>设置选号1(['万位', '千位', '百位', '十位', '个位'], 0, 9),
                502: ()=>设置选号1(['万位', '千位', '百位', '十位', '个位'], 0, 9),
                503: ()=>设置选号1(['选号'], 0, 9),
                504: ()=>设置选号1(['二重号', '单号'], 0, 9),
                505: ()=>设置选号1(['二重号', '单号'], 0, 9),
                506: ()=>设置选号1(['三重号', '单号'], 0, 9),
                507: ()=>设置选号1(['三重号', '二重号'], 0, 9),
                508: ()=>设置选号1(['四重号', '单号'], 0, 9),
                400: ()=>设置选号1(['千位', '百位', '十位', '个位'], 0, 9),
                402: ()=>设置选号1(['千位', '百位', '十位', '个位'], 0, 9),
                403: ()=>设置选号1(['选号'], 0, 9),
                404: ()=>设置选号1(['二重号', '单号'], 0, 9),
                405: ()=>设置选号1(['二重号'], 0, 9),
                406: ()=>设置选号1(['三重号', '单号'], 0, 9),
                420: ()=>设置选号1(['万位', '千位', '百位', '十位'], 0, 9),
                422: ()=>设置选号1(['万位', '千位', '百位', '十位'], 0, 9),
                423: ()=>设置选号1(['选号'], 0, 9),
                424: ()=>设置选号1(['二重号', '单号'], 0, 9),
                425: ()=>设置选号1(['二重号'], 0, 9),
                426: ()=>设置选号1(['二重号', '单号号'], 0, 9),
                300: ()=>设置选号1(['百位', '十位', '个位'], 0, 9),
                302: ()=>设置选号1([''], 0, 27, true),
                303: ()=>设置选号1(['组三'], 0, 9),
                304: ()=>设置选号1(['组六'], 0, 9),
                320: ()=>设置选号1(['千位', '百位', '十位'], 0, 9),
                322: ()=>设置选号1([''], 0, 27, true),
                323: ()=>设置选号1(['组三'], 0, 9),
                324: ()=>设置选号1(['组六'], 0, 9),
                340: ()=>设置选号1(['万位', '千位', '百位'], 0, 9),
                342: ()=>设置选号1([''], 0, 27, true),
                343: ()=>设置选号1(['组三'], 0, 9),
                344: ()=>设置选号1(['组六'], 0, 9),
                200: ()=>设置选号1(['十位', '个位'], 0, 9),
                202: ()=>设置选号1([''], 0, 18,true),
                203: ()=>[{
                    style: 1,
                    name: '十位',
                    选号: [{ name: '大', active: false }, { name: '小', active: false }, { name: '单', active: false }, { name: '双', active: false }],
                    notitle: true
                }, {
                    style: 1,
                    name: '十位',
                    选号: [{ name: '大', active: false }, { name: '小', active: false }, { name: '单', active: false }, { name: '双', active: false }],
                    notitle: true
                }],
                204: ()=>设置选号1(['组选'], 0, 9),
                220: ()=>设置选号1(['万位', '千位'], 0, 9),
                222: ()=>设置选号1([''], 0, 18, true),
                223: ()=>[
                    {
                        style: 1,
                        name: '十位',
                        选号: [{ name: '大', active: false }, { name: '小', active: false }, { name: '单', active: false }, { name: '双', active: false }],
                        notitle: true
                    }, {
                        style: 1,
                        name: '十位',
                        选号: [{ name: '大', active: false }, { name: '小', active: false }, { name: '单', active: false }, { name: '双', active: false }],
                        notitle: true
                    }
                ],
                224: ()=>设置选号1(['组选'], 0, 9),
                100: ()=>设置选号1(['万位', '千位', '百位','十位', '个位'], 0, 9),
                120: ()=>设置选号1(['不定胆'], 0, 9),
                121: ()=>设置选号1(['不定胆'], 0, 9),
                122: ()=>设置选号1(['不定胆'], 0, 9),
                123: ()=>设置选号1(['不定胆'], 0, 9),
                124: ()=>设置选号1(['不定胆'], 0, 9),
                125: ()=>设置选号1(['不定胆'], 0, 9),
                126: ()=>设置选号1(['万位', '千位', '百位','十位', '个位'], 0, 9),
                128: ()=>[{ style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], },
                        ...设置选号1(['号码'], 0, 9)
                    ],
                129: ()=>设置选号1(['万位', '千位', '百位', '十位', '个位'], 0, 9),
                131: ()=>[{ style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], },
                        ...设置选号1(['号码'], 0, 9)
                    ],
                132: ()=>[{ style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], },
                        ...设置选号1(['号码'], 0, 9)
                    ],
                134: ()=>设置选号1(['万位', '千位', '百位', '十位', '个位'], 0, 9),
                600: ()=>设置选号1(['选号'], 0, 9),
                601: ()=>设置选号1(['选号'], 0, 9),
                602: ()=>设置选号1(['选号'], 0, 9),
                603: ()=>设置选号1(['选号'], 0, 9),
                604: ()=>设置选号1(['选号'], 0, 9),
                620: ()=>设置选号1(['选号'], 0, 9),
                621: ()=>设置选号1(['选号'], 0, 9),
                622: ()=>设置选号1(['选号'], 0, 9),
                623: ()=>设置选号1(['选号'], 0, 9),
                650: ()=>[{ style: 1, name: '十位', notitle: true, 选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }] }],
                651: ()=>[{ style: 1, name: '十位', notitle: true, 选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }] }],
                652: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                653: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                654: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                655: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                656: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                657: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                658: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
                659: ()=>[{
                    style: 1, name: '十位', notitle: true,
                    选号: [{ name: '龙', active: false }, { name: '虎', active: false }, { name: '和', active: false }],
                }],
            }
            if (codeList[this.code]) {
                return codeList[this.code]();
            } else {
                return []
            }
        }
        return []
    }
    get 获取投注() {
        var list_1 = [];
        var list_4 = [];
        //主要用于官方玩法 显示 上级名称
        var parentCode = [1,2,3,4];
        if(this.list.length>0){
            this.list.forEach(item => {
                let list_2 = item.选号.filter(x => x.active)
                let list_3 = [];
                list_2.forEach(x => {
                    if (parentCode.find(x => x == this.code)) {
                        x.parentkey = x.parentName ? x.parentName : item.name
                        // x.parentkey = item.name
                    }
                    list_3.push(x.name);
                    list_4.push(x)
                })
                list_1.push(list_3.join(',') ? list_3.join(',') : '_')
            })
        }else{
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
            str:list_1.join('|'),
            list:list_4
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
            // 107: () => combo(this.获取投注.list, 2),
        }
        var 相乘code = [];
        var newlist = [];
        var 注数 = 0
        var 相乘赔率 = 0;

        if (组合list[this.code]) {
            var list_2 = 组合list[this.code]();
            list_2.forEach(item => {
                var name = [];
                item.forEach(x => name.push(x.name))
                var 赔率list = item.sort((x, y) => {
                    return x.赔率 - y.赔率
                })
                newlist.push({
                    name: name.join(','),
                    赔率: 赔率list[0].赔率
                })
            })
            注数 = newlist.length
        } else{ 
            newlist = this.获取投注.list
            注数 = newlist.length
        }
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
    设置选号() {
        this.list = this.球组
    }
    设置机选() {
        if(this.list.length==0){
            var 随机组=this.机选()
            var list1=随机组.slice(0,this.手动list.length);
            var list2=随机组.slice(this.手动list.length);
            console.log(list1,list2,随机组)
            for (let k = 0; k < this.手动list.length; k++) {
                for (let i = 0; i < this.手动list[k].选号.length; i++) {
                    this.手动list[k].选号[i].active = false
                    this.手动list[k].选号[i].active = list1[k].findIndex(x => x == i) != -1;
                }
            }
            for (let i = 0; i < list2.length; i++) {
                list2[i]=list2[i].join('')
            }
            var str=list2.join('|');
            this.手动输入=str;
        }else{
            let 随机= this.机选()
            for (let k = 0; k < this.list.length; k++) {
                for (let i = 0; i < this.list[k].选号.length; i++) {
                    this.list[k].选号[i].active = false
                    this.list[k].选号[i].active = 随机[k].findIndex(x => x == i) != -1;
                }
            }
        }
    }
    // get 手动机选(测试code){
    机选(){
        var 随机整数_1 = (list, 免重复,列数) => {
            console.log('生产随机数')
            var list_1 = [];
            var 随机列=[];
            if(列数 && 列数>0){
                for (let i = 0; i >=0; i++) {
                    let n=Math.floor(Math.random() * (list.length-1 - 0 + 1) + 0);
                    if(随机列.findIndex(x=>x==n) == -1){
                        随机列.push(n)
                    }
                    if(随机列.length==列数){
                        break;
                    }
                }
            }

            for (let i = 0; i < list.length; i++) {
                if(随机列.length>0 && 随机列.findIndex(x=>x==i)==-1){
                    list_1.push([]);
                    console.log('结束_'+i)
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
            500:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }], false),
            501:()=> 随机整数_1([{ max: 9, number: 5 }], true),
            502:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }], false),
            503:()=> 随机整数_1([{ max: 9, number: 5 }], true),
            504:()=> 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 3 }], true),
            505:()=> 随机整数_1([{ max: 9, number: 2 }, { max: 9, number: 1 }], true),
            506:()=> 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 2 }], true),
            507:()=> 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 1 }], true),
            508:()=> 随机整数_1([{ max: 9, number: 1 }, { max: 9, number: 1 }], true),

            400:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }], false),
            401:()=> 随机整数_1([{ max: 9, number: 4 }], false),
            402:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }], false),
            403:()=> 随机整数_1([{ max: 9, number: 4 }], true),
            404:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 2 }], true),
            405:()=> 随机整数_1([{ max: 9, number: 2 }], true),
            406:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 }], true),
            420:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }], false),
            421:()=> 随机整数_1([{ max: 9, number: 4 }], false),
            422:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }], false),
            423:()=> 随机整数_1([{ max: 9, number: 4 }]),
            424:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 2 }],true),
            425:()=> 随机整数_1([{ max: 9, number: 2 }]),
            426:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 }],true),
            
            300:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],false),
            301:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            302:()=> 随机整数_1([{ max: 27, number: 1 }],false),
            303:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            304:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            305:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            320:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],false),
            321:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            322:()=> 随机整数_1([{ max: 27, number: 1 }],false),
            323:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            324:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            325:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            340:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],false),
            341:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            342:()=> 随机整数_1([{ max: 27, number: 1 }],false),
            343:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            344:()=> 随机整数_1([{ max: 9, number: 3 }],false),
            345:()=> 随机整数_1([{ max: 9, number: 3 }],false),

            200:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 }],false),
            201:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            202:()=> 随机整数_1([{ max: 18, number: 1 }],false),
            203:()=> 随机整数_1([{ max: 3, number: 1 },{ max: 3, number: 1 }],false),
            204:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            205:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            220:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 }],false),
            221:()=> 随机整数_1([{ max: 9, number: 2 }],false),
            222:()=> 随机整数_1([{ max: 18, number: 1 }],false),
            223:()=> 随机整数_1([{ max: 3, number: 1 },{ max: 3, number: 1 }],false),
            224:()=> 随机整数_1([{ max: 9, number: 2 }],true),
            225:()=> 随机整数_1([{ max: 9, number: 2 }],true),

            100:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],true,1),
            120:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            121:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            122:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            123:()=> 随机整数_1([{ max: 9, number: 2 }],true),
            124:()=> 随机整数_1([{ max: 9, number: 2 }],true),
            125:()=> 随机整数_1([{ max: 9, number: 2 }]),

            126:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],false,2),
            127:()=> 随机整数_1([{ max: 4, number: 2 },{ max: 9, number: 2 }],false),
            128:()=> 随机整数_1([{ max: 4, number: 2 },{ max: 9, number: 2 }],false),
            129:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],false,3),
            130:()=> 随机整数_1([{ max: 4, number: 3 },{ max: 9, number: 3 }],false),
            131:()=> 随机整数_1([{ max: 4, number: 3 },{ max: 9, number: 2 }],false),
            132:()=> 随机整数_1([{ max: 4, number: 3 },{ max: 9, number: 3 }],false),
            133:()=> 随机整数_1([{ max: 4, number: 3 },{ max: 9, number: 3 }],false),
            134:()=> 随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }],false,4),
            135:()=> 随机整数_1([{ max: 4, number: 4 },{ max: 9, number: 4 }],false),

            600:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            601:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            602:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            603:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            604:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            620:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            621:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            622:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            623:()=> 随机整数_1([{ max: 9, number: 1 }],false),
            650:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            651:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            652:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            653:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            654:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            655:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            656:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            657:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            658:()=> 随机整数_1([{ max: 2, number: 1 }],false),
            659:()=> 随机整数_1([{ max: 2, number: 1 }],false),
        }
        console.log(this.code)
        var code=this.code;
        if (随机列表[code]) {
            let 随机 = 随机列表[code]();
            return 随机
        }
        return []
    }
    get 手动输入提示(){
        var obj={
                501:'请输入选号如：12345,45678 中间已“,”隔开',
                401:'请输入选号如：1234,4567 中间已“,”隔开',
                421:'请输入选号如：1234,4567 中间已“,”隔开',
                301:'请输入选号如：123,456 中间已“,”隔开',
                321:'请输入选号如：123,456 中间已“,”隔开',
                341:'请输入选号如：123,456 中间已“,”隔开',
                201:'请输入选号如：12,45 中间已“,”隔开',
                205:'请输入选号如：12,45 中间已“,”隔开',
                221:'请输入选号如：12,45 中间已“,”隔开',
                225:'请输入选号如：12,45 中间已“,”隔开',
                127:"请在上方选择最少2个位置,输入选号如：12,23中间已“,”隔开",
                130:"请在上方选择最少3个位置,输入选号如：123,234中间已“,”隔开",
                135:"请在上方选择最少4个位置,输入选号如：1234,4567中间已“,”隔开",
            }
        return obj[this.code] ? obj[this.code] : ''
    }
    get 手动输入头部(){
        var obj={
                127:()=>[
                    { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
                ],
                130:()=>[
                    { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
                ],
                135:()=>[
                    { style: '位置', name: '位置', 选号: [{ name: '万位', active: false }, { name: '千位', active: false }, { name: '百位', active: false }, { name: '十位', active: false }, { name: '个位', active: false }], }
                ],
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
    设置手动头部(){
        this.手动list=this.手动输入头部
    }
}

export default 时时彩配置;