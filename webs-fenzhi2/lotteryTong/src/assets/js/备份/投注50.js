import 循环选号 from './循环选号.js'

class 投注50 extends 循环选号{
    constructor(玩法) {
        super();
        this.玩法 = 玩法;
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
                赔率:iOdds['SP_'+i] ? iOdds['SP_'+i] : '' 
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
                    code:"SP_Dad",
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
}

export default 投注50;