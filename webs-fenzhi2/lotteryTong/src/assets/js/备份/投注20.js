class 投注20{
    constructor(玩法){
        this.玩法=玩法;
        this.code=玩法.Code
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
                120:设置选号1(['第一名'],1,10),
                200:设置选号1(['第一名','第二名'],1,10),
                300:设置选号1(['第一名','第二名','第三名'],1,10),
                100:设置选号1(['第一名','第二名','第三名','第四名','第五名'],1,10),
                100:设置选号1(['第一名','第二名','第三名','第四名','第五名'],1,10),
                101:设置选号1(['第六名','第七名','第八名','第九名','第十名'],1,10),
                401:[{style:1,name:'第一名',选号:[{name:'大',active:false},{name:'小',active:false}],notitle:true}],
                402:[{style:1,name:'第二名',选号:[{name:'大',active:false},{name:'小',active:false}],notitle:true}],
                403:[{style:1,name:'第三名',选号:[{name:'大',active:false},{name:'小',active:false}],notitle:true}],
                501:[{style:1,name:'第一名',选号:[{name:'单',active:false},{name:'双',active:false}],notitle:true}],
                502:[{style:1,name:'第二名',选号:[{name:'单',active:false},{name:'双',active:false}],notitle:true}],
                503:[{style:1,name:'第三名',选号:[{name:'单',active:false},{name:'双',active:false}],notitle:true}],
                601:[{style:1,name:"",notitle:true,选号:[{name:'大',active:false},{name:'小',active:false},{name:'单',active:false},{name:'双',active:false}]}],
                602:设置选号1([''],3,19,true),
            };
        if(codeList[this.code]){
            return codeList[this.code];
        }else{
            return []
        }
    }
    设置选号1(list,min,max,notitle){
        let list1=[];
        let 选号1=[];
        for (let i = min; i <=max; i++) {
            选号1.push({
                name:i,
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
}

export default 投注20;