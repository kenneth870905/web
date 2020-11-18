import 循环选号 from './循环选号.js'
import { timeout } from 'q';

class 投注50 extends 循环选号{
    constructor(玩法) {
        super();
        this.玩法 = 玩法;
        this.code = 玩法.Code;
        this.list = [];
        this.手动输入 = ""
        this.手动list = []   //头部
        this.选号免重复=false
        this.设置选号()
        this.设置手动头部();
        // this.设置免重复()
    }
    // Pc蛋蛋
    设置选号_3(list,min,max,notitle,显示赔率){
        var iOdds=this.玩法.iOdds;
        var 灰 = [0, 13, 14, 27];
        var 绿 = [1, 4, 7, 10, 16, 19, 22, 25];
        var 蓝 = [2, 5, 8, 11, 17, 20, 23, 26];
        var 红 = [3, 6, 9, 12, 15, 18, 21, 24];
        let list1=[];
        let 选号1=[];
        for (let i = min; i <=max; i++) {
            var color='';
            if(灰.includes(i)){
                color='灰'
            }else if(绿.includes(i)){
                color="绿"
            }else if(蓝.includes(i)){
                color="蓝"
            }else{
                color='红'
            }
            选号1.push({
                name:i,
                active:false,
                color:color,
                显示赔率:显示赔率 ? 显示赔率 : false,
                赔率:iOdds['SP_'+i] ? iOdds['SP_'+i] : '' ,
                code:'SP_'+i
            })
        }   
        list.forEach( x=> {
            list1.push({
                notitle:notitle ? notitle : false,
                style:2,
                name:x,
                选号:JSON.parse(JSON.stringify(选号1))
            })
        });
        return list1
    }
    get 球组(){
        var iOdds=this.玩法.iOdds;

        if(this.玩法.Code==100){
            var tableSpRows1 = [
                { code: 'SP_Dad', name: '大' }, { code: 'SP_DadDan', name: '大单' }, { code: 'SP_HOB', name: '红波' }, { code: 'SP_JDad', name: '极大' },
                { code: 'SP_Xio', name: '小' }, { code: 'SP_XioDan', name: '小单' }, { code: 'SP_LVB', name: '绿波' }, { code: 'SP_JXio', name: '极小' },
                { code: 'SP_Dan', name: '单' }, { code: 'SP_DadShg', name: '大双' }, { code: 'SP_LAB', name: '蓝波' }, 
                { code: 'SP_Shg', name: '双' }, { code: 'SP_XioShg', name: '小双' }, { code: 'SP_BAOZI', name: '豹子'}
            ];
            tableSpRows1.forEach(item=>{
                item.赔率=iOdds[item.code]
            })
            var obj={
                    name:"",
                    notitle:true,
                    style:'方形4',
                    选号:tableSpRows1
                }
            return [...this.设置选号_3([''],0,27,true,true) , obj ]
        }else if(this.玩法.Code==500){
            var Odds=this.玩法.Odds;
            var list=[0,6,12,18,24,1,7,13,19,25,2,8,14,20,26,3,9,15,21,27,4,10,16,22,5,11,17,23]
            var list1=[]
            var 灰 = [0, 13, 14, 27];
            var 绿 = [1, 4, 7, 10, 16, 19, 22, 25];
            var 蓝 = [2, 5, 8, 11, 17, 20, 23, 26];
            var 红 = [3, 6, 9, 12, 15, 18, 21, 24];
            for (let i = 0; i < list.length ; i++) {
                var color='';
                if(灰.includes(i)){
                    color='灰'
                }else if(绿.includes(i)){
                    color="绿"
                }else if(蓝.includes(i)){
                    color="蓝"
                }else{
                    color='红'
                }
                var obj={
                    code:"SP_BAOSAN",
                    name:list[i],
                    赔率:Odds,
                    color:color
                }
                list1.push(obj)
            }
            return [{
                name:"",
                notitle:true,
                style:2,
                选号: list1
            }]
            // return this.设置选号_3([''],0,27,true,true)
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
            500: () => combo(this.获取投注.list, 3)
        }
        var 相乘code = [];
        var newlist = [];
        var 注数 = 0
        var 相乘赔率 = 0;
        var orderlist='';
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
        } else if (相乘code.find(x => x == this.code)) {
            newlist = this.获取投注.list
            // console.log(newlist)
            if (newlist.length > 0) {
                this.获取投注.list.forEach(item => {
                    if (!相乘赔率) {
                        相乘赔率 = item.赔率
                    } else {
                        相乘赔率 = item.赔率 * 相乘赔率
                    }
                })
            }
            相乘赔率 = Math.round(相乘赔率 * 1000) / 1000
            注数 = newlist.length > 1 ? 1 : 0
        } else {
            newlist = this.获取投注.list
            注数 = newlist.length
        }
        // var list_1 = 组合list[this.code] ? 组合list[this.code]() : this.获取投注.list;
        if(this.code == 500){
            orderlist=[]
            newlist.forEach(item=>{
                orderlist.push({
                    key:'SP_BAOSAN',
                    content:item.name
                })
            })
        }
        var 显示组数 = [500]
        var 显示赔率 = [500];

        return {
            list: this.获取投注.list,
            list_1: 组合list[this.code] ? 组合list[this.code]() : this.获取投注.list ,
            newlist: newlist,
            注数: 注数,
            // 选号区
            显示组数: 显示组数.find(x => x == this.code) ? true : false,
            显示赔率: 显示赔率.find(x => x == this.code) ? true : false,
            // 确认弹框
            相乘赔率: 相乘赔率,
            orderlist:orderlist
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
            100: () => 随机整数_1([{ max: 27, number: 2 }], false),
            // 221: () => 随机整数_1([{ max: 5, number: 2 }], true),
            // 222: () => 随机整数_1([{ max: 5, number: 1 }, { max: 5, number: 1 }], true),
            // 200: () => 随机整数_1([{ max: 5, number: 1 },{ max: 5, number: 1 }], true),
            // 201: () => 随机整数_1([{ max: 5, number: 2 }], false),
            // 202: () => 随机整数_1([{ max: 5, number: 1 }], false),
            // 310: () => 随机整数_1([{ max: 5, number: 3 }], false),
            // 311: () => 随机整数_1([{ max: 5, number: 3 }], false),

            // 300: () => 随机整数_1([{ max: 5, number: 1 }], false),
            // 301: () => 随机整数_1([{ max: 5, number: 6 }], false),

            // 333: () => 随机整数_1([{ max: 3, number: 4 }], false),
            // 600: () => 随机整数_1([{ max: 15, number: 1 }], false),

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
            // 201: '请输入选号如：12,34 中间已“,”隔开',
        }
        return obj[this.code] ? obj[this.code] : '未设置提示语'
    }
    get 手动输入头部() {
        var obj = {
            // 127:()=>[
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
            return this.玩法.Odds
        } else if (typeof this.玩法.Odds == 'object') {
            // 例如 时时彩 龙虎 万千 玩法
            var this_1 = this;
            var list = JSON.parse(JSON.stringify(this.玩法.Odds));
            for (let i = 0; i < list.length; i++) {
                list[i] = list[i] * (100 - this_1.待确认投注.point) / 100
                list[i] = Math.round(list[i] * 1000) / 1000
            }
            return list
        }
    }
}

export default 投注50;