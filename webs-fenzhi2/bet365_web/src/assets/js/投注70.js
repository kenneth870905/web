import 循环选号 from './循环选号.js'

class 投注70 extends 循环选号{
    constructor(玩法) {
        super();
        this.玩法 = 玩法;
        this.markSixNums=$.base.markSixNums;
    }
    数字(){
        var list=[];
        for (let i = 1; i <=49; i++) {
            list.push({name:i<10 ? '0'+i : i})
        }
        return list
    }
    色单双球(code,type,type2){
        // type 单双 type2 大小
        var list= this.markSixNums.colors[key].list ;
        // return list
        var list1=[]
        if(type=='单'){
            list1=list.filter(x=>parseInt(x) % 2==1)
        }else{
            list1=list.filter(x=>parseInt(x) % 2==0)
        }
        if(type2){
            if(type2=='大'){
                list1=list1.filter(x=>x >= 25)
            }else{
                list1=list1.filter(x=>x < 25)
            }
        }
        return list1
    }
    get 球组(){
        console.log(this.markSixNums);
        var iOdds = this.玩法.iOdds;
        var 号码1=this.数字();
        var 号码2 = [
            { key: 'SP_Dan', name: '特单' }, { key: 'SP_Shg', name: '特双' }, { key: 'SP_Dad', name: '特大' }, { key: 'SP_Xio', name: '特小' }, { key: 'SP_WDad', name: '尾大' },
            { key: 'SP_HDan', name: '和单' }, { key: 'SP_HShg', name: '和双' }, { key: 'SP_HDad', name: '和大' }, { key: 'SP_HXio', name: '和小' }, { key: 'SP_WXio', name: '尾小' },
            { key: 'SP_DadShg', name: '大双' }, { key: 'SP_XioShg', name: '小双' }, { key: 'SP_DadDan', name: '大单' }, { key: 'SP_XioDan', name: '小单' }
        ]
        var 生肖 = [
            {key:"A1", name: "鼠" }, {key:"A2", name: "牛" }, {key:"A3" ,name: "虎" }, {key:"A4", name: "兔" }, {key:"A5", name: "龙" }, {key:"A6", name: "蛇" },
            {key:"A7", name: "马" }, {key:"A8", name: "羊" }, {key:"A9", name: "猴" }, {key:"AA", name: "鸡" }, {key:"AB", name: "狗" }, {key:"AC", name: "猪" }
        ]
        //特码玩法
        var tableSpRows1 = [
            { code: 'SP_Dan', name: '特单' }, { code: 'SP_Shg', name: '特双' }, { code: 'SP_Dad', name: '特大' }, { code: 'SP_Xio', name: '特小' },
            { code: 'SP_HDan', name: '和单' }, { code: 'SP_HShg', name: '和双' }, { code: 'SP_HDad', name: '和大' }, { code: 'SP_HXio', name: '和小' },
            { code: 'SP_ZhDan', name: '总单' }, { code: 'SP_ZhShg', name: '总双' }, { code: 'SP_ZhDad', name: '总大' }, { code: 'SP_ZhXio', name: '总小' }
        ];
        //大小单双
        var tableZm16 = [
            { key: 'Dan', name: '单' }, { key: 'Shg', name: '双' }, { key: 'Dad', name: '大' }, { key: 'Xio', name: '小' },
            { key: 'HDan', name: '和单' }, { key: 'HShg', name: '和双' }, { key: 'HDad', name: '和大' }, { key: 'HXio', name: '和小' }
        ]

        //大小单双,尾，波色
        var tableZmW16 = [
            { key: 'Dan', name: '单' }, { key: 'Shg', name: '双' }, { key: 'Dad', name: '大' }, { key: 'Xio', name: '小' },
            { key: 'HDan', name: '和单' }, { key: 'HShg', name: '和双' }, { key: 'HDad', name: '和大' }, { key: 'HXio', name: '和小' },
            { key: 'WDad', name: '尾大' }, { key: 'WXio', name: '尾小' }, { key: 'HOB', name: '红波' }, { key: 'LVB', name: '绿波' }, { key: 'LAB', name: '蓝波' }
        ]
        var 连码=[  "01", "11", "21", "31", "41" , 
                    "02", "12", "22", "32", "42" , 
                    "03", "13", "23", "33", "43" , 
                    "04", "14", "24", "34", "44" , 
                    "05", "15", "25", "35", "45" , 
                    "06", "16", "26", "36", "46" , 
                    "07", "17", "27", "37", "47" ,
                    "08", "18", "28", "38", "48" ,
                    "09", "19", "29", "39", "49" ,
                    "10", "20", "30", "40"
                ]
        if(this.玩法.Code==102 || this.玩法.Code==101){
            var list=[];
                list[0]={ name:"", notitle:true, style:3, 选号:JSON.parse(JSON.stringify(号码1)) }
                list[1]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(号码2)) }
            list[0].选号.forEach(item => {
                var code=''
                if(this.玩法.Code==101){
                    code='A_No'+item.name
                }else if(this.玩法.Code==102){
                    code='B_No'+item.name
                }
                item.code=code;
                item.赔率=iOdds[code]
                item.显示赔率=true;
            });
            list[1].选号.forEach(item=>{
                item.code=item.key;
                item.赔率=iOdds[item.key]
            })
            return list;
        }else if(this.玩法.Code==135 || this.玩法.Code==136 || this.玩法.Code==137){
            var numKey = { 135: 'SP_', 136: 'ZMS_', 137: 'YS_' };
            var list=[]
                list[0]={ name:"", notitle:true, style:'方形3', 选号:JSON.parse(JSON.stringify(生肖)) };
            list[0].选号.forEach(item=>{
                var code=numKey[this.玩法.Code]+item.key;
                item.code=code;
                item.赔率=iOdds[code];
                item.number=this.markSixNums.sx[item.key].list
            })
            return list
        }else if(this.玩法.Code==107 || this.玩法.Code == 108 || this.玩法.Code == 109 || this.玩法.Code == 110){
            var numKey = { 107: 'LS2_', 108: 'LS3_', 109: 'LS4_', 110: 'LS5_' };
            var numMin = { 107: 2, 108: 3, 109: 4, 110: 5 };
            var list=[]
                list[0]={ name:"", notitle:true, style:'方形3', 选号:生肖};
                list[0].选号.forEach(item=>{
                    var code=numKey[this.玩法.Code]+item.key;
                    item.code=code;
                    item.赔率=iOdds[code];
                    item.number=this.markSixNums.sx[item.key].list
                })
            return list
        }else if(this.玩法.Code == 115 || this.玩法.Code == 116 || this.玩法.Code == 117 || this.玩法.Code == 118 || this.玩法.Code == 119 || this.玩法.Code == 120){
            var Odds=this.玩法.Odds;
            // 连码
            var numKey = { 115: 'LM4Z_', 116: 'LM3Z_', 117: 'LM3Z2_', 118: 'LM2Z_', 119: 'LM2ZT_', 120: 'LMTC_' };
            var numMin = { 115: 4, 116: 3, 117: 3, 118: 2, 119: 2, 120: 2 };
            var list=[]
                list[0]={ name:"", notitle:true, style:3, 选号:[]};
                for (let i = 0; i < 连码.length; i++) {
                    list[0].选号.push({
                        赔率:Odds,
                        name:连码[i],
                        code:numKey[this.玩法.Code]+连码[i]
                    })                
                }
            return list
        }else if(this.玩法.Code==141){
            var rows = [ { code: 'SP_HOB', name: '红波' }, { code: 'SP_LAB', name: '蓝波' }, { code: 'SP_LVB', name: '绿波' }];
            var list=[];
                list[0]={ name:"色波", notitle:true, style:'方形3', 选号:JSON.parse(JSON.stringify(rows)) }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            return list;
        }else if(this.玩法.Code==142){
            var rows = [
                { code: 'SP_BHODan', name: '红单', color: '红', 对应号码: this.色单双球('HO','单') },
                { code: 'SP_BHOShg', name: '红双', color: '红', 对应号码: this.色单双球('HO','双') },
                { code: 'SP_BHODad', name: '红大', color: '红', 对应号码: this.色单双球('HO','单') },
                { code: 'SP_BHOXio', name: '红小', color: '红', 对应号码: this.色单双球('HO','双') },
                { code: 'SP_BLVDan', name: '绿单', color: '绿', 对应号码: this.色单双球('LV','单') },
                { code: 'SP_BLVShg', name: '绿双', color: '绿', 对应号码: this.色单双球('LV','双') },
                { code: 'SP_BLVDad', name: '绿大', color: '绿', 对应号码: this.色单双球('LV','单') },
                { code: 'SP_BLVXio', name: '绿小', color: '绿', 对应号码: this.色单双球('LV','双') },
                { code: 'SP_BLADan', name: '蓝单', color: '蓝', 对应号码: this.色单双球('LA','单') },
                { code: 'SP_BLAShg', name: '蓝双', color: '蓝', 对应号码: this.色单双球('LA','双') },
                { code: 'SP_BLADad', name: '蓝大', color: '蓝', 对应号码: this.色单双球('LA','单') },
                { code: 'SP_BLAXio', name: '蓝小', color: '蓝', 对应号码: this.色单双球('LA','双') }
            ];
            var list=[];
                list[0]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rows)) }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            return list;
        }else if(this.玩法.Code==143){
            var rows = [
                { code: 'SP_BHODadDan', name: '红大单', color: '红', 对应号码: this.色单双球('HO','单','大') },
                { code: 'SP_BHODadShg', name: '红大双', color: '红', 对应号码: this.色单双球('HO','双','大') },
                { code: 'SP_BHOXioDan', name: '红小单', color: '红', 对应号码: this.色单双球('HO','单','小') },
                { code: 'SP_BHOXioShg', name: '红小双', color: '红', 对应号码: this.色单双球('HO','双','小') },
                { code: 'SP_BLVDadDan', name: '绿大单', color: '绿', 对应号码: this.色单双球('LV','单','大') },
                { code: 'SP_BLVDadShg', name: '绿大双', color: '绿', 对应号码: this.色单双球('LV','双','大') },
                { code: 'SP_BLVXioDan', name: '绿小单', color: '绿', 对应号码: this.色单双球('LV','单','小') },
                { code: 'SP_BLVXioShg', name: '绿小双', color: '绿', 对应号码: this.色单双球('LV','双','小') },
                { code: 'SP_BLADadDan', name: '蓝大单', color: '蓝', 对应号码: this.色单双球('LA','单','大') },
                { code: 'SP_BLADadShg', name: '蓝大双', color: '蓝', 对应号码: this.色单双球('LA','双','大') },
                { code: 'SP_BLAXioDan', name: '蓝小单', color: '蓝', 对应号码: this.色单双球('LA','单','小') },
                { code: 'SP_BLAXioShg', name: '蓝小双', color: '蓝', 对应号码: this.色单双球('LA','双','小') }
            ];
            var list=[];
                list[0]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rows)) }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            return list;
        }else if(this.玩法.Code==144){
            var rows =[{ code: 'QSB_HO', name: '红波' }, { code: 'QSB_LA', name: '蓝波' }, { code: 'QSB_LV', name: '绿波' }, { code: 'QSB_HE', name: '和局' }]
            var list=[];
                list[0]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rows)) }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            return list;
        }else if(this.玩法.Code==100){
            var type=['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'];
            var list=[];
                list[0]={ name:"", notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(tableSpRows1))}
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            for (let i = 0; i < type.length; i++) {
                var obj={
                        name:type[i],
                        style:'方形4',
                        选号:JSON.parse(JSON.stringify(tableZm16))
                    }
                obj.选号.forEach(item=>{
                    var code='No'+(i+1)+'_'+item.key;
                    item.code=code;
                    item.赔率=iOdds[code];
                })
                list.push(obj);
            }
            return list;
        }else if(this.玩法.Code == 103 || this.玩法.Code == 151 || this.玩法.Code == 152 || this.玩法.Code == 153 || this.玩法.Code == 154 || this.玩法.Code == 155 || this.玩法.Code == 156){
            //正码，正码特1-6
            var numKey = { 103: 'ZM_', 151: 'ZMT1_', 152: 'ZMT2_', 153: 'ZMT3_', 154: 'ZMT4_', 155: 'ZMT5_', 156: 'ZMT6_' };
            var list=[];
                list[0]={ name:"", notitle:true, style:3, 选号:JSON.parse(JSON.stringify(号码1)) }
                list[0].选号.forEach(item => {
                    var code=numKey[this.玩法.Code]+item.name;
                    item.code = code;
                    item.赔率 = this.玩法.Odds
                    item.显示赔率 = true;
                });
            return list;
        }else if(this.玩法.Code==105){
            var type=['正码一', '正码二', '正码三', '正码四', '正码五', '正码六']
            var list=[];
                // list[0]={ name:"", notitle:true, style:3, 选号:JSON.parse(JSON.stringify(号码1)) }
                for (let i = 0; i < type.length; i++) {
                    var obj={
                            name:type[i],
                            style:'方形4',
                            选号:JSON.parse(JSON.stringify(tableZmW16))
                        }
                    obj.选号.forEach(item=>{
                        var code='No4_'+item.key;
                        item.code=code;
                        item.赔率=iOdds[code]
                    })
                    list.push(obj)
                }
            return list;
        }else if(this.玩法.Code==106){
            var type = [{key:"ZMGG1",name: '正码一'},{key:"ZMGG2" ,name: '正码二'},{key:"ZMGG3",name: '正码三'},{key:"ZMGG4",name: '正码四'},{key:"ZMGG5",name: '正码五'},{key:"ZMGG6",name: '正码六'}];
            var list=[];
            for (let i = 0; i < type.length; i++) {
                var obj={
                        name:type[i].name,
                        style:'方形4',
                        选号:JSON.parse(JSON.stringify(tableZmW16))
                    }
                    obj.选号.forEach(item=>{
                        var code=type[i].key+'_'+item.key;
                        item.code=code;
                        item.赔率=iOdds[code]
                    })
                list.push(obj)
            }
            return list
        }else if(this.玩法.Code == 111 || this.玩法.Code == 112 || this.玩法.Code == 113 || this.玩法.Code == 114){
            var numKey = { 111: 'LWP2_', 112: 'LWP3_', 113: 'LWP4_', 114: 'LWP5_' };
            var numMin = { 111: 2, 112: 3, 113: 4, 114: 5 };
            var list = [];
                list[0] = { name:'', style:'方形3', 选号:[]}
                for (let i = 0; i <= 9 ; i++) {
                    var index=i==0 ? 9 : i-1;
                    var code=numKey[this.玩法.Code]+i;
                    var obj={
                            name: i,
                            code:code,
                            赔率:iOdds[code],
                            number:this.markSixNums.weiNums[index].list
                        }
                    list[0].选号.push(obj)
                }
            return list;
        }else if(this.玩法.Code == 121 || this.玩法.Code == 122 || this.玩法.Code == 123 || this.玩法.Code == 124 || this.玩法.Code == 125 || this.玩法.Code == 126 || this.玩法.Code == 127 || this.玩法.Code == 128){
            //自选不中
            var numKey = { 121: 'ZBZ5_', 122: 'ZBZ6_', 123: 'ZBZ7_', 124: 'ZBZ8_', 125: 'ZBZ9_', 126: 'ZBZ10_', 127: 'ZBZ11_', 128: 'ZBZ12_' };
            var numMax = { 121: 10, 122: 10, 123: 10, 124: 11, 125: 12, 126: 13, 127: 13, 128: 14 };
            var numMin = { 121: 5, 122: 6, 123: 7, 124: 8, 125: 9, 126: 10, 127: 11, 128: 12 };
            var list=[];
                list[0]={ name:'',notitle:true, style:3, 选号:[]}
            for (let i = 0; i < 连码.length; i++) {
                var code=numKey[this.玩法.Code];
                var obj={
                        name:连码[i],
                        code:code,
                        赔率:this.玩法.Odds
                    }
                list[0].选号.push(obj)
            }
            return list
        }else if(this.玩法.Code==140){
            //总肖
            var rows = [
                { code: 'ZX2', name: '234肖' }, { code: 'ZX5', name: '5肖' },
                { code: 'ZX6', name: '6肖' }, { code: 'ZX7', name: '7肖' },
                { code: 'ZXD', name: '总肖单' }, { code: 'ZXS', name: '总肖双' }
            ];
            var list=[];
                list[0]={ name:'总肖',notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rows))}
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code]
                })
            return list
        }else if(this.玩法.Code == 138 || this.玩法.Code == 139){
            var 生肖=this.markSixNums.sx;
            var list=[];
                list[0]={ name:'',notitle:true, style:'方形3', 选号:[] }
            for (const key in 生肖) {
                var code='HS_'+key;
                var obj={
                    name:生肖[key].name,
                    code:code,
                    number:生肖[key].list,
                    赔率:iOdds[code]
                }
                list[0].选号.push(obj)
            }
            return list;
        }else if(this.玩法.Code==145){
            //特码头尾数
            var rows = [
                { code: 'TWS_T0', name: '头0' }, { code: 'TWS_T1', name: '头1' }, { code: 'TWS_T2', name: '头2' }, { code: 'TWS_T3', name: '头3' }, { code: 'TWS_T4', name: '头4' },
                { code: 'TWS_W0', name: '尾0' }, { code: 'TWS_W1', name: '尾1' }, { code: 'TWS_W2', name: '尾2' }, { code: 'TWS_W3', name: '尾3' }, { code: 'TWS_W4', name: '尾4' },
                { code: 'TWS_W5', name: '尾5' }, { code: 'TWS_W6', name: '尾6' }, { code: 'TWS_W7', name: '尾7' }, { code: 'TWS_W8', name: '尾8' }, { code: 'TWS_W9', name: '尾9' }
            ];
            var list=[];
                list[0]={ name:'',notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rows)) }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code];
                });
            return list;
        }else if(this.玩法.Code==146){
            //正特尾数
            var rows = [
                { code: 'ZTWS_W0', name: '尾0' }, { code: 'ZTWS_W1', name: '尾1' },
                { code: 'ZTWS_W2', name: '尾2' }, { code: 'ZTWS_W3', name: '尾3' },
                { code: 'ZTWS_W4', name: '尾4' }, { code: 'ZTWS_W5', name: '尾5' },
                { code: 'ZTWS_W6', name: '尾6' }, { code: 'ZTWS_W7', name: '尾7' },
                { code: 'ZTWS_W8', name: '尾8' }, { code: 'ZTWS_W9', name: '尾9' }
            ];
            var list=[];
                list[0]={ name:'',notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rows)) }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code];
                });
            return list;
        }else if(this.玩法.Code==147){
            //七码五行
            var rowsQ = [
                { code: 'QMWX_D0S', name: '单0 双7' }, { code: 'QMWX_D0X', name: '大0 小7' },
                { code: 'QMWX_D1S', name: '单1 双6' }, { code: 'QMWX_D1X', name: '大1 小6' },
                { code: 'QMWX_D2S', name: '单2 双5' }, { code: 'QMWX_D2X', name: '大2 小5' },
                { code: 'QMWX_D3S', name: '单3 双4' }, { code: 'QMWX_D3X', name: '大3 小4' },
                { code: 'QMWX_D4S', name: '单4 双3' }, { code: 'QMWX_D4X', name: '大4 小3' },
                { code: 'QMWX_D5S', name: '单5 双2' }, { code: 'QMWX_D5X', name: '大5 小2' },
                { code: 'QMWX_D6S', name: '单6 双1' }, { code: 'QMWX_D6X', name: '大6 小1' },
                { code: 'QMWX_D7S', name: '单7 双0' }, { code: 'QMWX_D7X', name: '大7 小0' }
            ];
            var 五行=this.markSixNums.wus
            var list=[];
                list[0]={ name:'',notitle:true, style:'方形4', 选号:JSON.parse(JSON.stringify(rowsQ)) }
                list[1]={ name:'',notitle:true, style:'方形4', 选号:[] }
                list[0].选号.forEach(item=>{
                    item.赔率=iOdds[item.code];
                });
                for (const key in 五行) {
                    var code='QMWX_WU'+key
                    var obj={
                            code:code,
                            name:五行[key].name,
                            赔率:iOdds[code]
                        }
                    list[1].选号.push(obj)
                }
            return list;
        }else if(this.玩法.Code == 129 || this.玩法.Code == 130 || this.玩法.Code == 131 || this.玩法.Code == 132 || this.玩法.Code == 133 || this.玩法.Code == 134){
            //中一
            var numKey = { 129: 'ZY5_', 130: 'ZY6_', 131: 'ZY7_', 132: 'ZY8_', 133: 'ZY9_', 134: 'ZY10_' };
            var numMax = { 129: 10, 130: 10, 131: 10, 132: 11, 133: 12, 134: 13 };
            var numMin = { 129: 5, 130: 6, 131: 7, 132: 8, 133: 9, 134: 10 };
            var list=[];
                list[0]={ name:'',notitle:true, style:3, 选号:[] }
            for (let i = 0; i < 连码.length; i++) {
                var code=numKey[this.玩法.Code] + 连码[i];
                var obj={
                        name:连码[i],
                        code:code,
                        赔率:this.玩法.Odds
                    }
                list[0].选号.push(obj)
            }
            return list;
        }
        return []
    }
}
export default 投注70
