class 投注20{
    constructor(玩法){
        this.玩法=玩法;
        this.code=玩法.Code;
        this.list = [];
        this.手动输入=""
        this.手动list=[]   //头部
        this.设置选号()
        this.设置手动头部();
    }
    设置选号1(list,min,max,notitle){
        let list1=[];
        let 选号1=[];
        for (let i = min; i <=max; i++) {
            选号1.push({
                name: i>9 ? i : 0+i.toString() ,
                active:false
            })
        }   
        list.forEach( x=> {
            list1.push({
                notitle:notitle ? notitle : false,
                style:1,
                name:x,
                选号:JSON.parse(JSON.stringify(选号1))
                // 选号:选号1
            })
        });
        return list1
    }
    设置选号2(list,min,max,notitle){
        let list1=[];
        let 选号1=[];
        for (let i = min; i <=max; i++) {
            选号1.push({
                name: i ,
                active:false,
                赔率:this.玩法.OddKeys[i]
            })
        }   
        list.forEach( x=> {
            list1.push({
                notitle:notitle ? notitle : false,
                style:1,
                name:x,
                选号:JSON.parse(JSON.stringify(选号1))
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
                        code:'MC'+(i+n)+'_'+type3[j],
                        parentName:type[i]
                    }
                list.push(obj)
            }
        }
        return list
    }
    get 球组(){
        var 大小 = [
            { code: 'Dad', name: '大' }, { code: 'Xio', name: '小' }, { code: 'Dan', name: '单' }, { code: 'Shg', name: '双' }
        ]
        if(this.code==1){
            var list=[];
                list[0]={
                    key:'',
                    style:'方形4',
                    name:'冠亚和',
                    选号: JSON.parse(JSON.stringify(大小)) ,
                };
            var iOdds=this.玩法.iOdds;
                list[0].选号.forEach(item=>{
                    item.code = 'GYH_'+item.code
                    item.赔率=iOdds[item.code]
                    item.active=false;
                    item.parentName='冠亚和'
                })

                list[1]={
                        style:'方形5',
                        选号:this.设置选号5(['冠军','亚军','第三名','第四名','第五名'],['大','小','单','双'],['Dad','Xio','Dan','Shg']),
                        name:['冠军','亚军','第三名','第四名','第五名']
                    }

                list[2]={
                    style:'方形5',
                    选号:this.设置选号5(['第六名','第七名','第八名','第九名','第十名'] , ['大','小','单','双'] , ['Dad','Xio','Dan','Shg'],6),
                    name:['第六名','第七名','第八名','第九名','第十名']
                }
            return list;
        }else if(this.code==2){
            var list=[]
                list[0]={
                    style:'方形5', 
                    选号:this.设置选号5(['冠军','亚军','第三名','第四名','第五名'] ,['01','02','03','04','05','06','07','08','09','10'] , ['N01','N02','N03','N04','N05','N06','N07','N08','N09','N10']),
                    name:['冠军','亚军','第三名','第四名','第五名']
                }
            return list
        }else if(this.code==3){
            let list=[]
                list[0]={
                    style:'方形5', 
                    选号:this.设置选号5(['第六名','第七名','第八名','第九名','第十名'] ,['01','02','03','04','05','06','07','08','09','10'] , ['N01','N02','N03','N04','N05','N06','N07','N08','N09','N10'],6),
                    name:['第六名','第七名','第八名','第九名','第十名']
                }
            return list
        }else if(this.code==4){
            var iOdds=this.玩法.iOdds;
            var list=[];
                list[0]={
                    name:"冠亚和值",
                    style:"方形4",
                    选号:[]
                }
                for (let i = 3; i <= 19; i++) {
                    list[0].选号.push({
                        name:i,
                        active:false,
                        code:'GYH_'+i,
                        赔率:iOdds['GYH_'+i]
                    })
                }
                list[1]={
                    name:"",
                    style:"方形4",
                    选号: JSON.parse(JSON.stringify(大小))
                }
                list[1].选号.forEach(item=>{
                    item.active=false;
                    item.赔率=iOdds['GYH_'+item.code];
                    item.code='GYH_'+item.code;
                })

            return list;
        }else if(this.code==5){
            var iOdds=this.玩法.iOdds;
            var list=[];
                list[0]={
                    name:"冠亚组合",
                    style:'方形3',
                    选号:[]
                }
            var key_1='GYZH_';
            for (const key in iOdds) {
                // var key_2=key.replace(key_1,'')
                list[0].选号.push({
                    active:false,
                    name:key.replace(key_1,''),
                    code:key,
                    赔率:iOdds[key]
                })
            }
            return list;
        }else if(this.code==6){
            var iOdds=this.玩法.iOdds;
            var 龙虎=['站位符','一 VS 十','二 VS 九','三 VS 八','四 VS 七','五 VS 六'];
            var list=[]
                list[0]={ name:"龙", style:'方形4', 选号:[]}
                list[1]={ name:"虎", style:'方形4', 选号:[]}
            for (let i = 1; i <=5 ; i++) {
                list[0].选号.push({
                    name:龙虎[i],
                    active:false,
                    赔率:iOdds['MC_LG'+i],
                    code:'MC_Lg'+i
                })
                list[1].选号.push({
                    name:龙虎[i],
                    active:false,
                    赔率:iOdds['MC_Hu'+i],
                    code:'MC_Hu'+i
                })
            }
            return list
        }

        // 官方玩法
        var 设置选号1=this.设置选号1
        var codeList={
                120:()=>设置选号1(['第一名'],1,10),
                200:()=>设置选号1(['第一名','第二名'],1,10),
                300:()=>设置选号1(['第一名','第二名','第三名'],1,10),
                100:()=>设置选号1(['第一名','第二名','第三名','第四名','第五名'],1,10),
                100:()=>设置选号1(['第一名','第二名','第三名','第四名','第五名'],1,10),
                101:()=>设置选号1(['第六名','第七名','第八名','第九名','第十名'],1,10),
                401:()=>[{style:1,name:'第一名',选号:[{name:'大',active:false},{name:'小',active:false}],notitle:true}],
                402:()=>[{style:1,name:'第二名',选号:[{name:'大',active:false},{name:'小',active:false}],notitle:true}],
                403:()=>[{style:1,name:'第三名',选号:[{name:'大',active:false},{name:'小',active:false}],notitle:true}],
                501:()=>[{style:1,name:'第一名',选号:[{name:'单',active:false},{name:'双',active:false}],notitle:true}],
                502:()=>[{style:1,name:'第二名',选号:[{name:'单',active:false},{name:'双',active:false}],notitle:true}],
                503:()=>[{style:1,name:'第三名',选号:[{name:'单',active:false},{name:'双',active:false}],notitle:true}],
                601:()=>[{style:1,name:"",notitle:true,选号:[{name:'大',active:false},{name:'小',active:false},{name:'单',active:false},{name:'双',active:false}]}],
                602:()=>this.设置选号2([''],3,19,true),
            };
        if(codeList[this.code]){
            return codeList[this.code]();
        }else{
            return []
        }
    }
    get 获取投注() {
        var list_1 = [];
        var list_4 = [];
        //主要用于官方玩法 显示 上级名称
        var parentCode = [1,2,3,4,6];
        if(this.list.length>0){
            this.list.forEach(item => {
                let list_3 = [];
                item.选号.forEach(x=>{
                    if(x.active){
                        if (parentCode.find(x => x == this.code)) {
                            x.parentkey = x.parentName ? x.parentName : item.name
                        }
                        list_3.push(x.name);
                        list_4.push(x);
                    }
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
        var 相乘code = [106];
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
            console.log(list1,list2,随机组);
            //手动输入头部
            for (let k = 0; k < this.手动list.length; k++) {
                for (let i = 0; i < this.手动list[k].选号.length; i++) {
                    this.手动list[k].选号[i].active = false
                    this.手动list[k].选号[i].active = list1[k].findIndex(x => x == i) != -1;
                }
            }
            //手动输入内容

            var 号码=['01','02','03','04','05','06','07','08','09','10']
            for (let i = 0; i < list2.length; i++) {
                // list2[i] 数组
                for (let k = 0; k < list2[i].length; k++) {
                    list2[i][k]=号码[list2[i][k]];
                }
                list2[i]=list2[i].join(' ')
            }
            var str=list2.join('|');
                console.log(str);
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
            120:()=>随机整数_1([{ max: 9, number: 1 }] ,false ),
            200:()=>随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 }] ,true ),
            201:()=>随机整数_1([{ max: 9, number: 2 }] , false ),
            300:()=>随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }] , true ),
            301:()=>随机整数_1([{ max: 9, number: 3 }] , false ),
            100:()=>随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }] , false ,1),
            101:()=>随机整数_1([{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 },{ max: 9, number: 1 }] , false ,1),
            401:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            402:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            403:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            501:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            502:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            503:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            601:()=>随机整数_1([{ max: 1, number: 1 }] ,false ),
            602:()=>随机整数_1([{ max: 17, number: 1 }] ,false ),
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
                201:'请输入选号如：01 02,03 04 中间已“,”隔开',
                301:'请输入选号如：01 02 03,03 04 05 中间已“,”隔开',
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
    get 赔率(){
        if(typeof this.玩法.Odds=='string'){
            return this.玩法.Odds
        }else if(typeof this.玩法.Odds=='object'){
            // 例如 时时彩 龙虎 万千 玩法
            var this_1=this;
            var list=JSON.parse(JSON.stringify(this.玩法.Odds));
            for (let i = 0; i < list.length; i++) {
                list[i]=list[i] * (100 - this_1.待确认投注.point) / 100
                list[i] = Math.round(list[i]*1000)/1000
            }
            return list
        }
    }
}

export default 投注20;