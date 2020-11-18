// const 选号1 = [];
//     // 数据类型 [{number:0,active:false}]
//     for (let i = 0; i < 10; i++) {
//         选号1.push({
//             number:i,
//             active:false
//         })
//     }

function 设置选号1(list,min,max,notitle){
    let list1=[];
    let 选号1=[];
    for (let i = min; i <=max; i++) {
        选号1.push({
            number:i,
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

function 设置选号20(list,min,max,notitle){
    let list1=[];
    let 选号1=[];
    for (let i = min; i <=max; i++) {
        选号1.push({
            number:i<10 ? '0'+i : i,
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

export default {
    namespaced: true,
    state:{
        汉字配置:{
            Dad:'大',
            Dan:"单",
            Shg:"双",
            Xio:"小",
        },
        选号配置:{
            10:{
                codeList:{
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
                            选号:[{number:'大',active:false},{number:'小',active:false},{number:'单',active:false},{number:'双',active:false}],
                            notitle:true
                        },{
                            style:1,
                            name:'十位',
                            选号:[{number:'大',active:false},{number:'小',active:false},{number:'单',active:false},{number:'双',active:false}],
                            notitle:true
                        }
                    ],
                    204:设置选号1(['组选'],0,9),
                    220:设置选号1(['万位','千位'],0,9),
                    222:设置选号1([''],0,18,true),
                    223:[{
                            style:1,
                            name:'十位',
                            选号:[{number:'大',active:false},{number:'小',active:false},{number:'单',active:false},{number:'双',active:false}],
                            notitle:true
                        },{
                            style:1,
                            name:'十位',
                            选号:[{number:'大',active:false},{number:'小',active:false},{number:'单',active:false},{number:'双',active:false}],
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
                    128:[{style:'位置',name:'位置',位置:[{number:'万位',active:false},{number:'千位',active:false},{number:'百位',active:false},{number:'十位',active:false},{number:'个位',active:false}],},
                        ...设置选号1(['号码'],0,9)
                    ],
                    129:设置选号1(['万位','千位','十位','百位','个位'],0,9),
                    131:[{style:'位置',name:'位置',位置:[{number:'万位',active:false},{number:'千位',active:false},{number:'百位',active:false},{number:'十位',active:false},{number:'个位',active:false}],},
                        ...设置选号1(['号码'],0,9)
                    ],
                    132:[{style:'位置',name:'位置',位置:[{number:'万位',active:false},{number:'千位',active:false},{number:'百位',active:false},{number:'十位',active:false},{number:'个位',active:false}],},
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
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    651:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    652:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    653:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    654:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    655:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    656:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    657:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    658:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                    659:{style:1,name:'十位',notitle:true,
                        选号:[{number:'龙',active:false},{number:'虎',active:false},{number:'和',active:false}],
                    },
                },
            },
            20:{
                codeList:{
                    120:设置选号1(['第一名'],1,10),
                    200:设置选号1(['第一名','第二名'],1,10),
                    300:设置选号1(['第一名','第二名','第三名'],1,10),
                    100:设置选号1(['第一名','第二名','第三名','第四名','第五名'],1,10),
                    100:设置选号1(['第一名','第二名','第三名','第四名','第五名'],1,10),
                    101:设置选号1(['第六名','第七名','第八名','第九名','第十名'],1,10),
                    401:[{style:1,name:'第一名',选号:[{number:'大',active:false},{number:'小',active:false}],notitle:true}],
                    402:[{style:1,name:'第二名',选号:[{number:'大',active:false},{number:'小',active:false}],notitle:true}],
                    403:[{style:1,name:'第三名',选号:[{number:'大',active:false},{number:'小',active:false}],notitle:true}],
                    501:[{style:1,name:'第一名',选号:[{number:'单',active:false},{number:'双',active:false}],notitle:true}],
                    502:[{style:1,name:'第二名',选号:[{number:'单',active:false},{number:'双',active:false}],notitle:true}],
                    503:[{style:1,name:'第三名',选号:[{number:'单',active:false},{number:'双',active:false}],notitle:true}],
                    601:[{style:1,name:"",notitle:true,选号:[{number:'大',active:false},{number:'小',active:false},{number:'单',active:false},{number:'双',active:false}]}],
                    602:设置选号1([''],3,19,true),
                }
            }
        }
    },
    getters:{

    },
    mutations:{},
    actions:{}
}