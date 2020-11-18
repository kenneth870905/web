class 时时彩配置{
    constructor(玩法){
        this.玩法三级=玩法;
        this.code=玩法.Code;
        this.汉字配置={
            Dad:'大',
            Dan:"单",
            Shg:"双",
            Xio:"小",
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
    设置选号20(list,min,max,notitle){
        let list1=[];
        let 选号1=[];
        for (let i = min; i <=max; i++) {
            选号1.push({
                name:i<10 ? '0'+i : i,
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
    get 球组(){
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
        if(this.code==4){
            var list=[];
            var iOdds=this.玩法三级.iOdds;
            var 星={'No1':'第一星','No2':'第二星','No3':'第三星','No4':'第四星','No5':'第五星','No_':'总和'}
            for (const key in iOdds) {
                var t1=key.substring(0,3);
                var t2=key.substring(key.indexOf('_')+1)
                var obj=list.find(x=>x.key==t1);
                if(obj){
                    obj.选号.push({'name':this.汉字配置[t2],'赔率':iOdds[key],'active':false})
                }else{
                    let obj1={
                        key:t1,
                        style:'方形4',
                        name:星[t1],
                        选号:[
                            {'name':this.汉字配置[t2],'赔率':iOdds[key],'active':false}
                        ],
                    };
                    list.push(obj1);
                }
            }
            return list
        }else if(this.code==1){
            var list=[{
                style:'方形5',
                选号:[]
            }];
            var type=['第一星','第二星','第三星','第四星','第五星']
            for (let i = 0; i < type.length; i++) {
                var obj={
                        name:type[i],
                        children:[]
                    }
                for (let j = 0; j <= 9; j++) {
                    let obj1={
                        name:j,
                        active:false,
                        编号:'No'+i+'_'+j,
                        赔率:this.玩法三级.Odds
                    }        
                    obj.children.push(obj1);
                }
                list[0].选号.push(obj)
            }    
            return list;
        }else if(this.code==2){
            var list=[];
                list[0]={
                        name:"",    //前中后
                        style:'方形3',
                        选号:JSON.parse(JSON.stringify(前中后三)) 
                    }
            for (let i = 0; i <list[0].选号.length ; i++) {
                var key=list[0].选号[i].key;
                list[0].选号[i].赔率=this.玩法三级.iOdds[key];
                list[0].选号[i].acitve=false;
            }
                list[1]={
                        name:"总和",
                        style:'方形4',
                        选号:JSON.parse(JSON.stringify(总和))
                    }
                for (let i = 0; i < list[1].选号.length; i++) {
                    var key=list[1].选号[i].key;
                    list[1].选号[i].赔率=this.玩法三级.iOdds[key];
                    list[1].选号[i].acitve=false;
                }
                list[2]={
                        name:"全5中1",
                        style:'方形4',
                        选号:[]
                    }
                for (let i = 0; i <= 9; i++) {
                    var key='QWZY_'+i
                    var obj={
                            name:i,
                            赔率:this.玩法三级.iOdds[key]
                        }
                    list[2].选号.push(obj)
                }
            return list;
        }else if(this.code==3){
            var list=[];
                list[0]={name:"龙",style:'方形4',选号:JSON.parse(JSON.stringify(龙虎))}
                list[1]={name:"虎",style:'方形4',选号:JSON.parse(JSON.stringify(龙虎))}
                list[2]={name:"和",style:'方形4',选号:JSON.parse(JSON.stringify(龙虎))}
                list[0].选号.forEach(item=>{
                    var key='LHD_'+item.code+'_Lg'
                    item.赔率=this.玩法三级.iOdds[key]
                })
                list[1].选号.forEach(item=>{
                    var key='LHD_'+item.code+'_Hu'
                    item.赔率=this.玩法三级.iOdds[key]
                })
                list[2].选号.forEach(item=>{
                    var key='LHD_'+item.code+'_He'
                    item.赔率=this.玩法三级.iOdds[key]
                })
            return list
        }else{
            var 设置选号1=this.设置选号1
            var codeList={
                    500:设置选号1(['万位','千位','百位','十位','个位'],0,9),
                    502:设置选号1(['万位','千位','百位','十位','个位'],0,9),
                    503:设置选号1(['选号'],0,9),
                    504:设置选号1(['二重号','单号'],0,9),
                    505:设置选号1(['二重号','单号'],0,9),
                    506:设置选号1(['三重号','单号'],0,9),
                    507:设置选号1(['三重号','二重号'],0,9),
                    508:设置选号1(['四重号','单号'],0,9),
                    400:设置选号1(['千位','百位','十位','个位'],0,9),
                    402:设置选号1(['千位','百位','十位','个位'],0,9),
                    403:设置选号1(['选号'],0,9),
                    404:设置选号1(['二重号','单号'],0,9),
                    405:设置选号1(['二重号'],0,9),
                    406:设置选号1(['三重号','单号'],0,9),
                    420:设置选号1(['万位','千位','百位','十位','个位'],0,9),
                    422:设置选号1(['万位','千位','百位','十位','个位'],0,9),
                    423:设置选号1(['选号'],0,9),
                    424:设置选号1(['二重号','单号'],0,9),
                    425:设置选号1(['二重号'],0,9),
                    426:设置选号1(['二重号','单号号'],0,9),
                    300:设置选号1(['百位','十位','个位'],0,9),
                    302:设置选号1([''],0,27,true),
                    303:设置选号1(['组三'],0,9),
                    304:设置选号1(['组六'],0,9),
                    320:设置选号1(['千位','百位','十位'],0,9),
                    322:设置选号1([''],0,27,true),
                    323:设置选号1(['组三'],0,9),
                    324:设置选号1(['组六'],0,9),
                    340:设置选号1(['万位','千位','百位'],0,9),
                    342:设置选号1([''],0,27,true),
                    343:设置选号1(['组三'],0,9),
                    344:设置选号1(['组六'],0,9),
                    200:设置选号1(['十位','个位'],0,9),
                    202:设置选号1([''],0,18),
                    203:[{
                            style:1,
                            name:'十位',
                            选号:[{name:'大',active:false},{name:'小',active:false},{name:'单',active:false},{name:'双',active:false}],
                            notitle:true
                        },{
                            style:1,
                            name:'十位',
                            选号:[{name:'大',active:false},{name:'小',active:false},{name:'单',active:false},{name:'双',active:false}],
                            notitle:true
                        }
                    ],
                    204:设置选号1(['组选'],0,9),
                    220:设置选号1(['万位','千位'],0,9),
                    222:设置选号1([''],0,18,true),
                    223:[{
                            style:1,
                            name:'十位',
                            选号:[{name:'大',active:false},{name:'小',active:false},{name:'单',active:false},{name:'双',active:false}],
                            notitle:true
                        },{
                            style:1,
                            name:'十位',
                            选号:[{name:'大',active:false},{name:'小',active:false},{name:'单',active:false},{name:'双',active:false}],
                            notitle:true
                        }
                    ],
                    224:设置选号1(['组选'],0,9),
                    100:设置选号1(['万位','千位','十位','百位','个位'],0,9),
                    120:设置选号1(['不定胆'],0,9),
                    121:设置选号1(['不定胆'],0,9),
                    122:设置选号1(['不定胆'],0,9),
                    123:设置选号1(['不定胆'],0,9),
                    124:设置选号1(['不定胆'],0,9),
                    125:设置选号1(['不定胆'],0,9),
                    126:设置选号1(['万位','千位','十位','百位','个位'],0,9),
                    128:[{style:'位置',name:'位置',位置:[{name:'万位',active:false},{name:'千位',active:false},{name:'百位',active:false},{name:'十位',active:false},{name:'个位',active:false}],},
                        ...设置选号1(['号码'],0,9)
                    ],
                    129:设置选号1(['万位','千位','十位','百位','个位'],0,9),
                    131:[{style:'位置',name:'位置',位置:[{name:'万位',active:false},{name:'千位',active:false},{name:'百位',active:false},{name:'十位',active:false},{name:'个位',active:false}],},
                        ...设置选号1(['号码'],0,9)
                    ],
                    132:[{style:'位置',name:'位置',位置:[{name:'万位',active:false},{name:'千位',active:false},{name:'百位',active:false},{name:'十位',active:false},{name:'个位',active:false}],},
                        ...设置选号1(['号码'],0,9)
                    ],
                    134:设置选号1(['万位','千位','十位','百位','个位'],0,9),
                    600:设置选号1(['选号'],0,9),
                    601:设置选号1(['选号'],0,9),
                    602:设置选号1(['选号'],0,9),
                    603:设置选号1(['选号'],0,9),
                    604:设置选号1(['选号'],0,9),
                    620:设置选号1(['选号'],0,9),
                    621:设置选号1(['选号'],0,9),
                    622:设置选号1(['选号'],0,9),
                    623:设置选号1(['选号'],0,9),
                    650:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    651:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    652:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    653:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    654:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    655:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    656:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    657:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    658:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
                    659:{style:1,name:'十位',notitle:true,
                        选号:[{name:'龙',active:false},{name:'虎',active:false},{name:'和',active:false}],
                    },
            }
            if(codeList[this.code]){
                return codeList[this.code];
            }else{
                return []
            }
        }
        return []
    }
}

export default 时时彩配置;