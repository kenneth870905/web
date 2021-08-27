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
                    item.赔率=iOdds['GYH_'+item.code]
                    item.active=false;
                })

                list[1]={
                        style:'方形5',
                        选号:[]
                    }
                var type=['冠军','季军','第三名','第四名','第五名']
                var type2=['大','小','单','双']
                for (let i = 0; i < type.length; i++) {
                    var obj={
                            name:type[i],
                            children:[]
                        }
                    for (let j = 0; j < 大小.length; j++) {
                        let obj1={
                            name:大小[j].name,
                            active:false,
                            编号:'MC'+j+'_'+大小[j].code,
                            赔率:this.玩法.Odds
                        }
                        obj.children.push(obj1);
                    }
                    list[1].选号.push(obj)
                }

                list[2]={
                    style:'方形5',
                    选号:[]
                }
                var type=['第六名','第七名','第八名','第九名','第十名']
                for (let i = 0; i < type.length; i++) {
                    var obj={
                            name:type[i],
                            children:[]
                        }
                    for (let j = 0; j < 大小.length; j++) {
                        let obj1={
                            name:大小[j].name,
                            active:false,
                            编号:'MC'+j+'_'+大小[j].code,
                            赔率:this.玩法.Odds
                        }
                        obj.children.push(obj1);
                    }
                    list[1].选号.push(obj)
                }

            return list;
        }else if(this.code==2){
            var list=[]
                list[0]={style:'方形5', 选号:[]}
                var type=['冠军','季军','第三名','第四名','第五名']
                for (let i = 0; i < type.length; i++) {
                    var obj={
                            name:type[i],
                            children:[]
                        }
                    for (let j = 1; j <= 10; j++) {
                        var name=j<10 ? '0'+j : j;
                        let obj1={
                            name: name ,
                            active:false,
                            编号:'MC'+(i+1)+'_N'+name,
                            赔率:this.玩法.Odds
                        }
                        obj.children.push(obj1);
                    }
                    list[0].选号.push(obj)
                }
            return list
        }else if(this.code==3){
            var list=[]
                list[0]={style:'方形5', 选号:[]}
                var type=['第六名','第七名','第八名','第九名','第十名']
                for (let i = 0; i < type.length; i++) {
                    var obj={
                            name:type[i],
                            children:[]
                        }
                    for (let j = 1; j <= 10; j++) {
                        var name=j<10 ? '0'+j : j;
                        let obj1={
                            name: name ,
                            active:false,
                            编号:'MC'+(i+1)+'_N'+name,
                            赔率:this.玩法.Odds
                        }
                        obj.children.push(obj1);
                    }
                    list[0].选号.push(obj)
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
                        编号:'GYH_'+i,
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
                    item.编号='GYH_'+item.code;
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
                    赔率:iOdds[key]
                })
            }
            return list;
        }else if(this.code==6){
            var iOdds=this.玩法.iOdds;
            var 龙虎=['站位符','一 VS 十','二 VS 九','三 VS 八','四 VS 七','五 VS 六'];
            var list=[]
                list[0]={ name:"龙", style:'方形4', 选号:[]}
                list[1]={ name:"龙", style:'方形4', 选号:[]}
            for (let i = 1; i <=5 ; i++) {
                list[0].选号.push({
                    name:龙虎[i],
                    active:false,
                    赔率:iOdds['MC_Hu'+i]
                })
                list[1].选号.push({
                    name:龙虎[i],
                    active:false,
                    赔率:iOdds['MC_Lg'+i]
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
        if(this.list.length>0){
            this.list.forEach(item => {
                let list_2 = item.选号.filter(x => x.active)
                let list_3 = [];
                list_2.forEach(x => {
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
            return this.玩法三级.Odds
        }else if(typeof this.玩法三级.Odds=='object'){
            // 例如 时时彩 龙虎 万千 玩法
            var this_1=this;
            var list=JSON.parse(JSON.stringify(this.玩法三级.Odds));
            for (let i = 0; i < list.length; i++) {
                list[i]=list[i] * (100 - this_1.待确认投注.point) / 100
                list[i] = Math.round(list[i]*1000)/1000
            }
            return list
        }
    }
}

export default 投注20;