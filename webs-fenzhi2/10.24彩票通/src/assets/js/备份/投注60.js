import 循环选号 from './循环选号.js';

class 投注60 extends 循环选号{

    constructor(玩法) {
        super();
        this.玩法 = 玩法;
    }
    设置选号_3(list){
        return this.设置选号_2(list,['01','02','03','04','05','06','07','08','09','10',11])
    }
    get 球组(){
        var iOdds=this.玩法.iOdds;
        var rowsZh = [
            { code: 'ZH_Dad', name: '总大' }, { code: 'ZH_Xio', name: '总小' }, { code: 'ZH_Dan', name: '总单' }, { code: 'ZH_Shg', name: '总双' },
            { code: 'ZH_WDad', name: '总尾大' }, { code: 'ZH_WXio', name: '总尾小' }
        ]
        var 选号2=[
            { code: "QS_Sha", name: '上' },{ code: "QS_SXH", name: '和' },{ code: "QS_Xia", name: '下' },{ code: "QS_JShu", name: '奇' },
            { code: "QS_JOH", name: '和' },{ code: "QS_OShu", name: '偶' }
        ]
        var 选号3 = [{ key: 'Dad', name: '大' }, { key: 'Xio', name: '小' }, { key: 'Dan', name: '单' }, { key: 'Shg', name: '双' }]

        if(this.玩法.Code==1){
            var list=[]
                list[0]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rowsZh)) }
                list[1]={ name:"", notitle:true, style:'方形3', 选号:JSON.parse(JSON.stringify(选号2)) }
                list[0].选号.forEach(item => {
                    item.赔率=iOdds[item.code];
                });
                list[1].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            var name=['正码一','正码二','正码三','正码四','正码五'];
                for (let i = 0; i < name.length; i++) {
                    var obj={ name:name[i] , notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(选号3)) }
                        obj.选号.forEach(item=>{
                            var code='No'+(i+1)+'_'+item.key;
                            item.code=code;
                            item.赔率=iOdds[code];
                        })
                    list.push(obj)
                }
            return list;
        }else if(this.玩法.Code==2){
            var list=[]
                list[0] = { name:"", notitle:true, style:'方形4', 选号:[]};
            for (let i = 1; i < 12; i++) {
                var key='QWZY_'+ (i<10 ? '0'+i : i);
                var obj={
                        code:key,
                        赔率:iOdds[key],
                        name:(i<10 ? '0'+i : i)
                    }
                list[0].选号.push(obj);
            }
            return list;
        }else if(this.玩法.Code==10 || this.玩法.Code==11 || this.玩法.Code==12 || this.玩法.Code==13 || this.玩法.Code==14){
            var list=[];
                list[0]={ name:"", notitle:true, style:'方形4', 选号:[]}
                list[1]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(选号3)) }
                list[2]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rowsZh)) }
            var number={
                10:1,
                11:2,
                12:3,
                13:4,
                14:5
            }
            for (let i = 1; i < 12; i++) {
                var key='No'+number[this.玩法.Code]+'_'+ (i<10 ? '0'+i : i);
                var obj={
                        code:key,
                        赔率:iOdds[key],
                        name: i<10 ? '0'+i : i
                    }
                list[0].选号.push(obj);
            }
            list[1].选号.forEach(item=>{
                var code='No'+number[this.玩法.Code]+'_'+item.key
                item.code=code
                item.赔率=iOdds[code]
            })
            list[2].选号.forEach(item=>{
                item.赔率=iOdds[item.code]
            })
            return list
        }else if(this.玩法.Code==3){
            var 龙虎 = [
                { key: '1V2', name: '一 VS 二' }, { key: '1V3', name: '一 VS 三' }, { key: '1V4', name: '一 VS 四' }, { key: '1V5', name: '一 VS 五' },
                { key: '2V3', name: '二 VS 三' }, { key: '2V4', name: '二 VS 四' }, { key: '2V5', name: '二 VS 五' }, { key: '3V4', name: '三 VS 四' },
                { key: '3V5', name: '三 VS 五' }, { key: '4V5', name: '四 VS 五' }
            ]
            var list=[]
                list[0]={ name:"龙", notitle:false, style:'方形4', 选号:[]};
                list[1]={ name:"虎", notitle:false, style:'方形4', 选号:[]};
            龙虎.forEach(item=>{
                var obj={
                        code:'LHD_'+item.key+'_Lg',
                        赔率:iOdds['LHD_'+item.key+'_Lg'],
                        name:item.name
                    }
                list[0].选号.push(obj);
                var obj1={
                        code:'LHD_'+item.key+'_Hu',
                        赔率:iOdds['LHD_'+item.key+'_Hu'],
                        name:item.name
                    }
                list[1].选号.push(obj1);
            })
            return list;
        }


        var list={
                300:this.设置选号_3(['第一位','第二位','第三位','第四位','第五位']),
                310:this.设置选号_3(['选号']),
                200:this.设置选号_3(['第一位','第二位']),
                210:this.设置选号_3(['选号']),
                900:this.设置选号_3(['选号']),
                100:this.设置选号_3(['第一位','第二位','第三位','第四位','第五位']),
                401:this.设置选号_3(['一中一']),
                402:this.设置选号_3(['二中二']),
                403:this.设置选号_3(['三中三']),
                404:this.设置选号_3(['四中四']),
                405:this.设置选号_3(['五中五']),
                406:this.设置选号_3(['六中五']),
                407:this.设置选号_3(['七中五']),
                408:this.设置选号_3(['八中五'])
            }
        if(list[this.玩法.Code]){
            return list[this.玩法.Code]
        }
        return []
    }
}

export default 投注60