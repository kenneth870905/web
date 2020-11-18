
import 循环选号 from './循环选号.js'

class 投注40 extends 循环选号{
    constructor(玩法){
        super();
        this.玩法=玩法
    }
    get 球组(){
        var iOdds=this.玩法.iOdds;
        if(this.玩法.Code==1){
            var 三中一 = [
                { name: '1' }, { name: '2' }, { name: '3' },{ name: '4'},{ name: '5'},{ name: '6'}
            ]
            var 三同号 = [
                { code:"STH_N1",name: '1 1 1' }, { code:"STH_N2",name: '2 2 2' }, { code:"STH_N3",name: '3 3 3' },{code:"STH_N4", name: '4 4 4'},{code:"STH_N5", name: '5 5 5'},{code:"STH_N6",name: '6 6 6'},{code:"STH_All",name:"通选"}
            ]
            var list=[];
                list[0]={ name:"三中一", style:'方形3', 选号:JSON.parse(JSON.stringify(三中一))}
                list[1]={ name:"三同号", style:'方形3', 选号:JSON.parse(JSON.stringify(三同号))}
            list[0].选号.forEach(item => {
                item.code='SZY_N'+item.name;
                item.赔率=iOdds['SZY_N'+item.name];
            });
            list[1].选号.forEach(item=>{
                item.赔率 = iOdds[item.code]
            })
            return list;
        }else if(this.玩法.Code==2){
            var 二同号 = [
                { code:"ETH_N1",name: '1 1' }, { code:"ETH_N2",name: '2 2' }, { code:"ETH_N3",name: '3 3' },{ code:"ETH_N4",name: '4 4'},{code:"ETH_N5", name: '5 5'},{code:"ETH_N6", name: '6 6'}
            ]
            var 二不同 = [
                { code:"EBT_1_2",name: '1 2' }, { code:"EBT_1_3",name: '1 3' }, { code:"EBT_1_4",name: '1 4' },
                { code:"EBT_1_5",name: '1 5' }, { code:"EBT_1_6",name: '1 6' }, { code:"EBT_2_3",name: '2 3' },
                { code:"EBT_2_4",name: '2 4' }, { code:"EBT_2_5",name: '2 5' }, { code:"EBT_2_6",name: '2 6' },
                { code:"EBT_3_4",name: '3 4' }, { code:"EBT_3_5",name: '3 5' }, { code:"EBT_3_6",name: '3 6' },
                { code:"EBT_4_5",name: '4 5' }, { code:"EBT_4_6",name: '4 6' }, { code:"EBT_5_6",name: '5 6' }
            ]
            var list=[];
                list[0]={ name:"二同号", style:'方形3', 选号:JSON.parse(JSON.stringify(二同号))}
                list[1]={ name:"二不同", style:'方形3', 选号:JSON.parse(JSON.stringify(二不同))}
            list[0].选号.forEach(item => {
                item.赔率=iOdds[item.code];
            });
            list[1].选号.forEach(item=>{
                item.赔率 = iOdds[item.code]
            })
            return list;
        }else if(this.玩法.Code==3){
            var list=[];
                list[0]={ name:"和值", style:'方形3', 选号: [] }
            for (let i = 3; i <= 18; i++) {
                list[0].选号.push({
                    code:'ZH_'+i,
                    name:i,
                    赔率:iOdds['ZH_'+i]
                })
            }
                list[0].选号.push({code:"ZH_Dad",name:"大",赔率:iOdds['ZH_Dad']})
                list[0].选号.push({code:"ZH_Xio",name:"小",赔率:iOdds['ZH_Xio']})
            return list;
        }
        var list={
            220:this.设置选号(['号码'],1,6),
            222:this.设置选号(['胆码','拖码'],1,6,true),
            200:[
                ...this.设置选号_2(['二同号'],[11,22,33,44,55,66],true),
                ...this.设置选号(['不同号'],1,6,true),
            ],
            202:this.设置选号_2(['二同号'],['11*','22*','33*','44*','55*','66*']),
            310:this.设置选号(['号码'],1,6),
            300:this.设置选号_2(['三同号'],['11*','22*','33*','44*','55*','66*']),
            301:this.设置选号_2(['三同号'],['111','222','333','444','555','666']),
            333:this.设置选号_2(['号码'],['123','234','345','456'],true),
            600:this.设置选号([''],3,18,true),
        }
        if(list[this.玩法.Code]){
            return list[this.玩法.Code]
        }
        return []
    }
}

export default 投注40;
