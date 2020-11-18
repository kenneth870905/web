<template>
    <div class="时时彩">
        <ul class="开奖头部">
            <li>
                <div class="近期" @click="显示最近记录=!显示最近记录">
                    <img class="logo_1" :src="config.img_url+'static/image/home/caipiao/'+当前彩种.id+'.png'">
                    <div>近期开奖</div>
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </div>
                <ul class="上期开奖">
                    <li v-if="近期开奖.length>0 && 近期开奖[0].Content && 近期开奖[0].Content.length>0">
                        <div v-if="index2<5" v-for="(item1, index2) in 近期开奖[0].Content" :key="index2">
                            <span class="圆球" :class="'号码'+item1">{{item1}}</span>
                        </div>
                    </li>
                    <li v-if="近期开奖.length>0 && 近期开奖[0].Content && 近期开奖[0].Content.length>0">
                        <div v-if="index2>=5" v-for="(item1, index2) in 近期开奖[0].Content" :key="index2">
                            <span class="圆球" :class="'号码'+item1">{{item1}}</span>
                        </div>
                    </li>
                    <li v-else class="红色">
                        <div class="开奖中">
                            开奖中...
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <div>距{{即将开奖.IssueCode}}期截止</div>
                <div >
                    <span v-if="即将开奖.Timer>0">
                        {{即将开奖.showTimer.h}}:{{即将开奖.showTimer.m}}:{{即将开奖.showTimer.s}}
                    </span>
                    <span v-else>开奖中</span>
                </div>

            </li>

            <div class="记录" v-show="显示最近记录">
                <div class="遮罩" @click="显示最近记录=!显示最近记录"></div>
                <ul>
                    <li class="item">
                        <div class="期数">期数</div>
                        <div class="开奖号">开奖号</div>
                        <div class="和值">和值</div>
                        <div class="大小">大小</div>
                    </li>
                    <li class="item" v-for="(item, index) in 近期开奖" :key="index">
                        <div class="期数2">{{item.IssueCode.substring(4)}}</div>
                        <div v-if="item.Content" class="开奖号2">
                            <div v-for="(item1, index2) in item.Content" :key="index2">
                                <span class="圆球" :class="'号码'+item1">{{item1}}</span>
                            </div>
                        </div>
                        <div v-if="item.Content" class="和值 font14">{{计算和值(item.Content)}}</div>
                        <div v-if="item.Content" class="大小 font14">{{计算大小(item.Content)}}</div>
                        <div v-else class="开奖中">
                            开奖中...
                        </div>
                    </li>
                </ul>
            </div>
        </ul>

        <div class="记录入口">
            <span>开奖记录</span>
            <span @click="切换官信()">{{type == 1 ? '切换到信用玩法' : '切换到官方玩法'}}</span>
        </div>

        <div class="选号区">
            <!-- 选择号码 -->
            <div v-for="(item , key , index) in 选号列表" :key="index">
                <wzys v-if="item.style=='位置'" name="位置" :位置="item.位置"/>
                <style1 v-if="item.style==1" :name="item.name" :显示头部="!item.notitle" :选号="item.选号"/>

                <!-- 方形3 -->
                <fangxing3 v-if="item.style=='方形3'" :name="item.name" :选号="item.选号"/>
                <fangxing4 v-if="item.style=='方形4'" :name="item.name" :选号="item.选号"/>
                <fangxing5 v-if="item.style=='方形5'" :选号="item.选号"/>


            </div>

            <srxh v-if="显示输入选号"/>
        </div>
        
    </div>
</template>

<script>
// import xuanhao from './components/pk10选号.vue'
import qhcz from '@/views/彩票投注/切换彩种.vue';
import qhwf from '@/views/彩票投注/切换玩法.vue';

import style1 from "@/components/彩票选票/样式1.vue";
import fangxing3 from "@/components/彩票选票/方形3.vue";
import fangxing4 from "@/components/彩票选票/方形4.vue";


import fangxing5 from "@/components/彩票选票/方形5.vue";
import srxh from '@/components/彩票选票/输入选号.vue'
import wzys from '@/components/彩票选票/位置样式.vue'

import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    name: "",
    components: {
        qhcz,
        qhwf,
        style1,
        srxh,
        wzys,
        fangxing3,
        fangxing4,
        fangxing5
        // xuanhao
    },
    data() {
        return {
            显示最近记录: false,
        }
    },
    computed: {
        ...mapState({
            config:'config',
            彩票配置:state=>state.投注.彩票配置,
            玩法三级:state=>state.投注.玩法三级,
            
            当前玩法: state => state.投注.玩法,
            彩种: state => state.投注.彩种,
            彩种配置: state => state.投注.彩票配置,
            近期开奖:state=>state.投注.近期开奖,
            即将开奖:state=>state.投注.即将开奖,
            marSixNums:state=>state.marSixNums,

            选号配置:x=>x.投注.投注配置.选号配置,
            汉字配置:x=>x.投注.投注配置.汉字配置
        }),
        ...mapGetters({
            当前彩种:'投注/当前彩种'
        }),
        type(){
            return this.$route.query.t ? this.$route.query.t : 1
        },
        id(){
            return this.$route.query.i
        },
        显示输入选号(){
            if( this.玩法三级.Code==201 ||
                this.玩法三级.Code==301
            ){
                return true;   
            }
            return false
        },
        选号列表(){
            // 官方玩法
            if(this.type==1){
                var id=this.id.substring(0,2);
                return this.选号配置[id]['codeList'][this.玩法三级.Code] ? this.选号配置[id]['codeList'][this.玩法三级.Code] : [];
            }
            // 信用玩法
            var 大小单双 = [
                { code: 'Dad', number: '大' }, { code: 'Xio', number: '小' }, { code: 'Dan', number: '单' }, { code: 'Shg', number: '双' }
            ];

            var tableMc10 = new Array();
            for (var i = 1; i <= 10; i++) {
                var no = ("0" + i).slice(-2);
                tableMc10.push({ code: "N" + no, name: no, numCls: 'num-item-ho' });
            }

            var tableGyDxds = [
                [{ key: 'GYH_Dad', name: '大' }, { key: 'GYH_Xio', name: '小' }, { key: 'GYH_Dan', name: '单' }, { key: 'GYH_Shg', name: '双' }]
            ];

            if(this.玩法三级.Code==1){
                var list=[];
                    list[0]={style:'方形4',name:"冠亚和",选号:JSON.parse(JSON.stringify(大小单双)) }
                    list[0].选号.forEach(item=>{
                        var key='GYH_'+item.code;
                        item.赔率 = this.玩法三级.iOdds[key]
                    })
                    list[1]={style:'方形5',name:"冠亚和",选号:[]}
                    var type=['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];

                    for (let i = 0; i < type.length; i++) {
                        var obj={
                                name:type[i],
                                children:[]
                            }
                        for (let j = 0; j <大小单双.length; j++) {
                            let obj1={
                                number:大小单双[j].number,
                                active:false,
                                编号:'No'+i+'_'+大小单双[j].code,
                                赔率:this.玩法三级.Odds
                            }        
                            obj.children.push(obj1);
                        }
                        list[1].选号.push(obj)
                    }    
                return list;
            }else if(this.玩法三级.Code==2){
                var list=[];
                    list[0]={style:'方形5',name:"",选号:[]}
                    var type=['冠军','亚军','第三名','第四名','第五名'];

                    for (let i = 0; i < type.length; i++) {
                        var obj={
                                name:type[i],
                                children:[]
                            }
                        for (let j = 1; j <=10; j++) {
                            let obj1={
                                number: j <10 ? '0'+j : j,
                                active:false,
                                编号:'No'+i+'_'+j,
                                赔率:this.玩法三级.Odds
                            }        
                            obj.children.push(obj1);
                        }
                        list[0].选号.push(obj)
                    }    
                return list;
            }


            return []

            //     //大小单双
            //     var tableZmDxds = [
            //         { code: 'Dad', name: '大' }, { code: 'Xio', name: '小' }, { code: 'Dan', name: '单' }, { code: 'Shg', name: '双' }
            //     ]

            //     var 龙虎 = [
            //         { code: 'WQ', name: '万千' }, { code: 'WB', name: '万百' }, { code: 'WS', name: '万十' }, { code: 'WG', name: '万个' },
            //         { code: 'QB', name: '千百' }, { code: 'QS', name: '千十' }, { code: 'QG', name: '千个' }, { code: 'BS', name: '百十' },
            //         { code: 'BG', name: '百个' }, { code: 'SG', name: '十个' }
            //     ]
            //     var 前中后三 = [
            //         { key: 'QSan_BZ', name: '前三豹子' }, { key: 'ZSan_BZ', name: '中三豹子' }, { key: 'HSan_BZ', name: '后三豹子' },
            //         { key: 'QSan_SZ', name: '前三顺子' }, { key: 'ZSan_SZ', name: '中三顺子' }, { key: 'HSan_SZ', name: '后三顺子' },
            //         { key: 'QSan_DZ', name: '前三对子' }, { key: 'ZSan_DZ', name: '中三对子' }, { key: 'HSan_DZ', name: '后三对子' },
            //         { key: 'QSan_ZL', name: '前三杂六' }, { key: 'ZSan_ZL', name: '中三杂六' }, { key: 'HSan_ZL', name: '后三杂六' },
            //         { key: 'QSan_BS', name: '前三半顺' }, { key: 'ZSan_BS', name: '中三半顺' }, { key: 'HSan_BS', name: '后三半顺' }
            //     ]
            //     var 总和 = [{ key: 'No_ZhDan', name: '总单' }, { key: 'No_ZhShg', name: '总双' }, { key: 'No_ZhDad', name: '总大' }, { key: 'No_ZhXio', name: '总小' }];


            // if(this.type==2){
            //     if(this.玩法三级.Code==4){
            //         var list=[];
            //         var iOdds=this.玩法三级.iOdds;
            //         var 星={'No1':'第一星','No2':'第二星','No3':'第三星','No4':'第四星','No5':'第五星','No_':'总和'}
            //         for (const key in iOdds) {
            //             var t1=key.substring(0,3);
            //             var t2=key.substring(key.indexOf('_')+1)
            //             var obj=list.find(x=>x.key==t1);
            //             if(obj){
            //                 obj.选号.push({'number':this.汉字配置[t2],'赔率':iOdds[key],'active':false})
            //             }else{
            //                 let obj1={
            //                     key:t1,
            //                     style:'方形4',
            //                     name:星[t1],
            //                     选号:[
            //                         {'number':this.汉字配置[t2],'赔率':iOdds[key],'active':false}
            //                     ],
            //                 };
            //                 list.push(obj1);
            //             }
            //         }
            //         return list
            //     }else if(this.玩法三级.Code==1){
            //         var list=[{
            //                     style:4,
            //                     选号:[]
            //                 }];
            //         var type=['第一星','第二星','第三星','第四星','第五星']
            //         for (let i = 0; i < type.length; i++) {
            //             var obj={
            //                     name:type[i],
            //                     children:[]
            //                 }
            //             for (let j = 0; j <= 9; j++) {
            //                 let obj1={
            //                     number:j,
            //                     active:false,
            //                     编号:'No'+i+'_'+j,
            //                     赔率:this.玩法三级.Odds
            //                 }        
            //                 obj.children.push(obj1);
            //             }
            //             list[0].选号.push(obj)
            //         }    
            //         return list;
            //     }else if(this.玩法三级.Code==2){
            //         var list=[];
            //             list[0]={
            //                     name:"",    //前中后
            //                     style:'方形3',
            //                     选号:JSON.parse(JSON.stringify(前中后三)) 
            //                 }
            //         for (let i = 0; i <list[0].选号.length ; i++) {
            //             var key=list[0].选号[i].key;
            //             list[0].选号[i].赔率=this.玩法三级.iOdds[key];
            //             list[0].选号[i].acitve=false;
            //         }
            //             list[1]={
            //                     name:"总和",
            //                     style:'方形4',
            //                     选号:JSON.parse(JSON.stringify(总和))
            //                 }
            //             for (let i = 0; i < list[1].选号.length; i++) {
            //                 var key=list[1].选号[i].key;
            //                 list[1].选号[i].number=list[1].选号[i].name
            //                 list[1].选号[i].赔率=this.玩法三级.iOdds[key];
            //                 list[1].选号[i].acitve=false;
            //             }
            //             list[2]={
            //                     name:"全5中1",
            //                     style:'方形4',
            //                     选号:[]
            //                 }
            //             for (let i = 0; i <= 9; i++) {
            //                 var key='QWZY_'+i
            //                 var obj={
            //                         number:i,
            //                         赔率:this.玩法三级.iOdds[key]
            //                     }
            //                 list[2].选号.push(obj)
            //             }
            //         return list;
            //     }else if(this.玩法三级.Code==3){
            //         var list=[];
            //             list[0]={name:"龙",style:'方形4',选号:JSON.parse(JSON.stringify(龙虎))}
            //             list[1]={name:"虎",style:'方形4',选号:JSON.parse(JSON.stringify(龙虎))}
            //             list[2]={name:"和",style:'方形4',选号:JSON.parse(JSON.stringify(龙虎))}
            //             list[0].选号.forEach(item=>{
            //                 var key='LHD_'+item.code+'_Lg'
            //                 item.number=item.name;
            //                 item.赔率=this.玩法三级.iOdds[key]
            //             })
            //             list[1].选号.forEach(item=>{
            //                 var key='LHD_'+item.code+'_Hu'
            //                 item.number=item.name;
            //                 item.赔率=this.玩法三级.iOdds[key]
            //             })
            //             list[2].选号.forEach(item=>{
            //                 var key='LHD_'+item.code+'_He'
            //                 item.number=item.name;
            //                 item.赔率=this.玩法三级.iOdds[key]
            //             })

            //         return list
            //     }else{
            //         return []
            //     }
            // }else{
            //     return this.选号配置[id]['codeList'][this.玩法三级.Code] ? this.选号配置[id]['codeList'][this.玩法三级.Code] : [];
            // }
        }
    },
    methods: {
        ...mapMutations({
            设置state: "投注/设置state"
        }),
        getColor(number){
            var colorCode=this.marSixNums.nums[number];
            return colorCode;
        },
        切换官信(){
            if(this.type==1){
                this.$router.replace('/buyLottery?i='+this.id+'&t=2')
            }else{
                this.$router.replace('/buyLottery?i='+this.id)
            }
        },
        计算和值(list){
            return parseInt(list[0])+parseInt(list[1])  
        },
        计算大小(list){
            var number = parseInt(list[0])+parseInt(list[1])  
            
            return number >11 ? '大':'小';
        },
        计算单双(list){
            var number=0;
            list.forEach(element => {
                number=number + parseInt(element);
            });
            return number % 2 == 0 ? '双' : '单';
        }
    },
    mounted() {
        // console.log(this.$route)
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
}
</script>

<style lang="scss" scoped>
.时时彩{
    height: 100%;
    display: flex;
    flex-direction: column;
    
}
.选号区{
    flex-grow: 1;
    height: 100%;
    background: #ffffff;
    overflow: auto;
}
.font14{
    font-size: _vw(14);
}
.mui-bar-nav {
    .mui-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .btn_1 {
            font-size: 14px;
            background: none;
            padding: 0px 10px;
            line-height: 30px;
            outline: none;
        }
    }
    .btn_2 {
        display: flex;
        align-items: center;
        font-size: 14px;
        i {
            font-size: 10px;
            margin: 0px 0px 0px 3px;
            font-size: 10px;
        }
    }
}

.开奖头部 {
    flex-shrink: 0;
    display: flex;
    min-height: _vw(70);
    position: sticky;
    top: 0px;
    border-bottom: 1px solid #f2f2f2;
    > li {
        width: 50%;
        flex-shrink: 0;
        background: #ffffff;
        padding: _vw(10) 0px;
    }
    > li:nth-child(1) {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .近期 {
            margin: 0px 0px _vw(3) 0px;
            display: flex;
            align-items: center;
            font-size: _vw(14);
            .logo_1 {
                width: _vw(24);
                height: _vw(24);
                margin: 0px _vw(5) 0px 0px;
            }
            i {
                font-size: _vw(10);
            }
        }
        .上期开奖 {
            >li{
                display: flex;
                justify-content: center;
            }
            .单双{
                font-size: _vw(12);
            }
        }
    }
    > li:nth-child(2) {
        position: relative;
        z-index: 1;
        border-left: 1px solid #efeff4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > div:nth-child(1) {
            font-size: _vw(14);
            margin: 0px 0px _vw(3) 0px;
        }
        > div:nth-child(2) {
            font-size: _vw(18);
            color: red;
        }
    }
    .记录 {
        position: absolute;
        width: 100%;
        left: 0px;
        height: _vw(240);
        bottom: _vw(-240);
        overflow: auto;
        .遮罩 {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
        }
        > ul {
            position: relative;
            z-index: 1;
            background: #ffffff;
        }
        .item {
            &:nth-child(2n-1) {
                background: #e5e5e5;
            }
            &:nth-child(1) {
                position: sticky;
                top: 0px;
                line-height: _vw(30);
                font-size: _vw(15);
            }
            height: _vw(30);
            display: flex;
            text-align: center;
            align-items: center;
            .期数,
            .期数2 {
                width: _vw(85);
                flex-shrink: 0;
                flex-grow: 0;
                line-height: _vw(30);
                border-right: 1px solid #cccccc;
            }
            .期数2 {
                font-size: _vw(14);
            }
            .开奖号,
            .开奖号2 {
                flex-grow: 1;
            }
            .开奖号2{
                align-items: center;
                display: flex;
                justify-content: center;
                .单双{
                    font-size: _vw(13);
                }
            }
            .开奖中 {
                flex-grow: 1;
            }
            .和值,
            .大小,
            .单双{
                width: _vw(40);
            }
        }
    }
}
.圆球 {
    font-size: _vw(12);
    width: _vw(20);
    height: _vw(20);
    // border-radius: 100%;
    margin: 0px 1px;
    border-radius: 3px;
    text-align: center;
    line-height: _vw(20);
    color: #ffffff;
    display: block;

    $colorlist: #eedd0f #0092dd #4b4b4b #ff7600 #17e2e5 #5234ff #bfbfbf #ff2600 #780b00 #07bf00 ;
    @each $color1 in $colorlist{
        $i:index($colorlist, $color1);
        @if ($i<10){
            $i:'0'+$i
        }
        &.号码#{$i}{
            background: $color1;
        }
    }
}



.记录入口 {
    flex-shrink: 0;
    font-size: _vw(12);
    display: flex;
    justify-content: space-between;
    padding: _vw(5) 0px;
    color: #676767;
    span{
        padding: 0px _vw(15);
        display: inline-block;
        height: _vw(20);
        line-height: _vw(20);
        background: #ffffff;
    }
    span:nth-child(1){
        border-top-right-radius: _vw(20);
        border-bottom-right-radius: _vw(20);
    }
    span:nth-child(2){
        border-top-left-radius: _vw(20);
        border-bottom-left-radius: _vw(20);
    }
}
</style>
