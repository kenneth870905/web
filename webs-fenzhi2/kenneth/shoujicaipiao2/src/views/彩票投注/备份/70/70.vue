<template>
    <div class="">
        <ul class="开奖头部">
            <li>
                <div class="近期" @click="显示最近记录=!显示最近记录">
                    <img class="logo_1" :src="config.img_url+'static/image/home/caipiao/'+当前彩种.id+'.png'" alt="">
                    <div>近期开奖</div>
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </div>

                <ul class="彩票上期">
                    <li v-if="近期开奖.length>0 && 近期开奖[0].Content && 近期开奖[0].Content.length>0">
                        <div v-if="index2 < 近期开奖[0].Content.length-1" v-for="(item1, index2) in 近期开奖[0].Content" :key="index2">
                            <span class="圆球" :class="getColor(item1).color">{{item1}}</span>
                            <div class="生肖">{{getColor(item1).sx}}</div>
                        </div>
                        <div>
                            <span>+</span>
                        </div>
                        <div>
                            <span class="圆球" :class="getColor(近期开奖[0].Content[近期开奖[0].Content.length-1]).color">{{近期开奖[0].Content[近期开奖[0].Content.length-1]}}</span>
                            <div class="生肖">{{getColor(近期开奖[0].Content[近期开奖[0].Content.length-1]).sx}}</div>
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
                    <span v-if="即将开奖.showTimer">
                        {{即将开奖.showTimer.h}}:{{即将开奖.showTimer.m}}:{{即将开奖.showTimer.s}}
                    </span>
                    <span v-else>00:00:00</span>
                </div>

            </li>

            <div class="记录" v-show="显示最近记录">
                <div class="遮罩" @click="显示最近记录=!显示最近记录"></div>
                <ul>
                    <li class="item">
                        <div class="期数">期数</div>
                        <div class="开奖号">开奖号</div>
                    </li>
                    <li class="item" v-for="(item, index) in 近期开奖" :key="index">
                        <div class="期数2">{{item.IssueCode}}</div>
                        <div v-if="item.Content" class="开奖号2">
                            <div v-if="index2<item.Content.length-1" v-for="(item1, index2) in item.Content" :key="index2">
                                <span class="圆球" :class="getColor(item1).color">{{item1}}</span>
                                <div class="生肖">{{getColor(item1).sx}}</div>
                            </div>
                            <div>
                                <span>+</span>
                            </div>
                            <div>
                                <span class="圆球" :class="getColor(item.Content[item.Content.length-1]).color">{{item.Content[item.Content.length-1]}}</span>
                                <div class="生肖">{{getColor(item.Content[item.Content.length-1]).sx}}</div>
                            </div>
                        </div>
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

        <div v-for="(item, index) in 选号列表" :key="index">
            <style1 v-if="item.style==1" :name="item.name" :显示头部="!item.notitle" :选号="item.选号"/>
            <style2 v-if="item.style==2" :name="item.name" :选号="item.选号"/>
            <style3 v-if="item.style==3" :name="item.name"/>
        </div>

    </div>
</template>

<script>

// import xuanhao from './components/pk10选号.vue'
var 当前={
    iKeys:[],
    iOdds:{
        //红色圆球
        B_No01:48.8,
        //方形 2 列
        SP_DadDan:3.75,
        SP_DadShg:3.75,
        SP_Dan:1.965,
        SP_HDad:1.965,
        SP_HDan:1.965,
        SP_HShg:1.965,
        SP_HXio:1.965,
        SP_Shg:1.965,
        SP_WDad:1.965,
        SP_WXio:1.965,
        SP_Xio:1.965,
        SP_XioDan:3.75,
        SP_XioShg:3.75,
        SP_HOB:2.7,
        SP_LAB:2.9,
        SP_LVB:2.9,
        SP_BHODad:6.55,
        SP_BHODan:5.65,
        SP_BHOShg:5.05,
        SP_BHOXio:4.55,
        SP_BLADad:5.05,
        SP_BLADan:5.65,
        SP_BLAShg:5.65,
        SP_BLAXio:6.55,
        SP_BLVDad:5.65,
        SP_BLVDan:5.65,
        SP_BLVShg:6.55,
        SP_BLVXio:6.55,

        SP_BHODadDan:14.3,
        SP_BHODadShg:10.52,
        SP_BHOXioDan:8.92,
        SP_BHOXioShg:8.92,
        SP_BLADadDan:8.92,
        SP_BLADadShg:10.52,
        SP_BLAXioDan:14.3,
        SP_BLAXioShg:10.52,
        SP_BLVDadDan:10.52,
        SP_BLVDadShg:10.52,
        SP_BLVXioDan:10.52,
        SP_BLVXioShg:14.3,
        QSB_HE:24.5,
        QSB_HO:2.15,
        QSB_LA:2.5,
        QSB_LV:2.5,

        //方形 3 列 生肖
        SP_A1:11.5,
        SP_A2:11.5,
        SP_A3:11.5,
        SP_A4:11.5,
        SP_A5:11.5,
        SP_A6:11.5,
        SP_A7:11.5,
        SP_A8:11.5,
        SP_A9:11.5,
        SP_AA:11.5,
        SP_AB:11.5,
        SP_AC:9.5,

        

    },
    Odds:9600 //倍率
}

import style1 from "@/components/彩票选票/样式1.vue";
import style3 from "@/components/彩票选票/样式3.vue";
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    name: "",
    components: {
        style1,
        style3
        // xuanhao
    },
    data() {
        return {
            显示切换彩种: false,
            显示切换玩法:false,
            玩法数组: [

                {
                    value: '0',
                    text: '特码AB',
                    children: [
                            {
                                name:"特码A",
                                children:[
                                    { value: '0', text: "特码A",投注列表:[
                                        {style:3,name:'号码',选号:[]},
                                    ]},
                                ]
                            },
                            {
                                name:"特码B",
                                children:[
                                    { value: '1', text: "特码B",投注列表:[
                                        {style:3,name:'号码',选号:[]},
                                    ]},
                                ]
                            },
                            {
                                name:"其他",
                                children:[
                                    { value: '2', text: "其他",投注列表:[
                                        {style:1,name:'号码',选号:['特单','特双','特大','特小','尾大','合单','合双','合大','合小','尾小','大双','小双','大单','小单']},
                                    ]},
                                ]
                            }
                        ]
                },
                {
                    value:"1",
                    text:"两面",
                    children:[
                        {
                            name:"两面",
                            children:[
                                { value: '0', text: "其他",投注列表:[
                                    {style:2,name:'',选号:['特单','特双','特大','特小','合单','合双','合大','合小','总单','总双','总大','总小']},
                                ]},
                                { value: '1', text: "正一",投注列表:[
                                    {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小']},
                                ]},
                                { value: '2', text: "正二",投注列表:[
                                    {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小']},
                                ]},
                                { value: '3', text: "正三",投注列表:[
                                    {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小']},
                                ]},
                                { value: '4', text: "正四",投注列表:[
                                    {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小']},
                                ]},
                                { value: '5', text: "正五",投注列表:[
                                    {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小']},
                                ]},
                                { value: '6', text: "正六",投注列表:[
                                    {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小']},
                                ]},
                            ]
                        },
                    ]
                },
                {   
                    value:"2",
                    text:"正码",
                    children:[
                        {
                            name:"正码",
                            children:[
                                {value:"0",text:"正码",投注列表:[
                                    {style:3,name:'号码',选号:[]},
                                ]},
                            ]
                        }
                    ]
                },
                {value:"3",text:"正特码",children:[
                    {name:"正特码",children:[
                        {value:"0",text:"正特一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"1",text:"正特二",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"2",text:"正特三",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"3",text:"正特四",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"4",text:"正特五",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"5",text:"正特六",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                    ]},
                ]},
                {value:"4",text:"正码1-6",children:[
                    {name:"正码1-6",children:[
                        {value:"0",text:"正码一",投注列表:[
                            {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小','尾大','尾小','红波','绿波','蓝波']},
                        ]},
                        {value:"1",text:"正码二",投注列表:[
                            {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小','尾大','尾小','红波','绿波','蓝波']},
                        ]},
                        {value:"2",text:"正码三",投注列表:[
                            {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小','尾大','尾小','红波','绿波','蓝波']},
                        ]},
                        {value:"3",text:"正码四",投注列表:[
                            {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小','尾大','尾小','红波','绿波','蓝波']},
                        ]},
                        {value:"4",text:"正码五",投注列表:[
                            {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小','尾大','尾小','红波','绿波','蓝波']},
                        ]},
                        {value:"5",text:"正码六",投注列表:[
                            {style:2,name:'',选号:['单','双','大','小','合单','合双','合大','合小','尾大','尾小','红波','绿波','蓝波']},
                        ]},
                    ]},
                ]},
                {value:"5",text:"连码",children:[
                    {name:"连码",children:[
                        {value:"0",text:"四全中",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"1",text:"三全中",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"2",text:"三中二",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"3",text:"二全中",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"4",text:"二中特",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"5",text:"特串",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                    ]},
                ]},
                {value:"6",text:"连肖",children:[
                    {name:"连肖",children:[
                        {value:"0",text:"二连肖",投注列表:[
                            {style:2,name:'',选号:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']},
                        ]},
                        {value:"1",text:"三连肖",投注列表:[
                            {style:2,name:'',选号:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']},
                        ]},
                        {value:"2",text:"四连肖",投注列表:[
                            {style:2,name:'',选号:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']},
                        ]},
                        {value:"3",text:"五连肖",投注列表:[
                            {style:2,name:'',选号:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']},
                        ]},
                    ]},
                ]},
                {value:"7",text:"连尾",children:[
                    {name:"连尾",children:[
                        {value:"0",text:"二尾碰",投注列表:[
                            {style:2,name:'',选号:["尾1","尾2","尾3","尾4","尾5","尾6","尾7","尾8","尾9","尾0"]},
                        ]},
                        {value:"1",text:"三尾碰",投注列表:[
                            {style:2,name:'',选号:["尾1","尾2","尾3","尾4","尾5","尾6","尾7","尾8","尾9","尾0"]},
                        ]},
                        {value:"2",text:"四尾碰",投注列表:[
                            {style:2,name:'',选号:["尾1","尾2","尾3","尾4","尾5","尾6","尾7","尾8","尾9","尾0"]},
                        ]},
                        {value:"3",text:"五尾碰",投注列表:[
                            {style:2,name:'',选号:["尾1","尾2","尾3","尾4","尾5","尾6","尾7","尾8","尾9","尾0"]},
                        ]},
                    ]},
                ]},
                {value:"8",text:"生肖",children:[
                    {name:"生肖",children:[
                        {value:"0",text:"特码生肖",投注列表:[
                            {style:2,name:'',选号:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗",'猪' ]},
                        ]},
                        {value:"1",text:"正肖",投注列表:[
                            {style:2,name:'',选号:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗",'猪' ]},
                        ]},
                        {value:"2",text:"平特一肖",投注列表:[
                            {style:2,name:'',选号:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗",'猪' ]},
                        ]},
                        {value:"3",text:"总肖",投注列表:[
                            {style:2,name:'',选号:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗",'猪' ]},
                        ]},
                    ]},
                ]},
                {value:"9",text:"合肖",children:[
                    {name:"合肖",children:[
                        {value:"0",text:"中",投注列表:[
                            {style:2,name:'',选号:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗",'猪' ]},
                        ]},
                        {value:"1",text:"不中",投注列表:[
                            {style:2,name:'',选号:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗",'猪' ]},
                        ]},
                    ]},
                ]},
                {value:"10",text:"色波",children:[
                    {name:"色波",children:[
                        {value:"0",text:"三色波",投注列表:[
                            {style:2,name:'',选号:['红波','绿波','蓝波']},
                        ]},
                        {value:"1",text:"半波",投注列表:[
                            {style:2,name:'',选号:['红单','红双','红大','红小','绿单','绿双','绿大','绿小','蓝单','蓝双','蓝大','蓝小']},
                        ]},
                        {value:"2",text:"半半波",投注列表:[
                            {style:2,name:'',选号:['红大单','红大双','红小单','红小双','绿大单','绿大双','绿小单','绿小双','蓝大单','蓝小单','蓝小单','蓝小双']},
                        ]},
                    ]},
                ]},
                {value:"11",text:"尾数",children:[
                    {name:"尾数",children:[
                        {value:"0",text:"头尾数",投注列表:[
                            {style:2,name:'',选号:['尾1','尾2','尾3','尾4','尾5','尾6','尾7','尾8','尾9']},
                        ]},
                        {value:"1",text:"正特尾数",投注列表:[
                            {style:2,name:'',选号:['尾3','尾4','尾5','尾6','尾7','尾8','尾9']},
                        ]},
                    ]},
                ]},
                {value:"12",text:"中一",children:[
                    {name:"中一",children:[
                        {value:"0",text:"五中一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"1",text:"六中一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"2",text:"七中一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"3",text:"八中一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"4",text:"九中一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                        {value:"5",text:"十中一",投注列表:[
                            {style:3,name:'号码',选号:[]},
                        ]},
                    ]},
                ]}
            ],
            显示最近记录: false,
        }
    },
    computed: {
        ...mapState({
            config:'config',
            当前玩法: state => state.投注.玩法,
            彩种: state => state.投注.彩种,
            彩种配置: state => state.投注.彩票配置,
            近期开奖:state=>state.投注.近期开奖,
            即将开奖:state=>state.投注.即将开奖,
            marSixNums:state=>state.marSixNums
        }),
        ...mapGetters({
            当前彩种:'投注/当前彩种'
        }),
        选号列表(){
            var list=[];
            var obj=this.玩法数组[this.当前玩法[0]]
                obj.children.forEach(x=>{
                    x.children.forEach(y=>{
                        if(y.value==this.当前玩法[1]){
                            list=y.投注列表 ? y.投注列表 : []
                        }   
                    })
                })
            return list;
        },
        玩法名称() {
            var obj=this.玩法数组[this.当前玩法[0]];
            var obj_1=""
            if(obj){
                obj.children.forEach(item => {
                    item.children.forEach(x=>{
                        if(x.value==this.当前玩法[1]){
                            obj_1=x
                        }
                    })
                });
            }
            return  obj.text+'-'+(obj_1 ? obj_1.text : '');
        },
        type(){
            return this.$route.query.t ? this.$route.query.t : 1
        },
        id(){
            return this.$route.query.i
        },
    },
    methods: {
        ...mapMutations({
            设置state: "投注/设置state"
        }),
        getColor(number){
            var colorCode=this.marSixNums.nums[number];
            return colorCode;
        },
        返回() {
            history.back();
        },
        选择类型() {
            this.显示切换玩法=true;
            // this.typePicker.show(items => {
            //     var list = [items[0].value, items[1].value]
            //     this.设置state(['玩法', list])
            //     this.设置玩法();
            // });
        },
        设置玩法() {
            
        }
    },
    mounted() {
        this.设置state(['玩法',[0,0]]);
        this.设置state(['玩法数组',this.玩法数组])

    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
}
</script>

<style lang="scss" scoped>

.开奖头部 {
    z-index: 1;
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
        .彩票上期 {
            >li{
                display: flex;
                justify-content: center
            }
            .生肖{
                font-size: _vw(12);
                text-align: center;
            }
            .开奖中{
                color: #ec0909
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
            padding: _vw(4) 0px;
            min-height: _vw(30);
            display: flex;
            text-align: center;

            &:nth-child(2n-1) {
                background: #e5e5e5;
            }
            &:nth-child(1) {
                position: sticky;
                top: 0px;
                line-height: _vw(30);
                font-size: _vw(15);
            }
            .期数,
            .期数2 {
                width: _vw(120);
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
                .生肖{
                    font-size: _vw(12);
                }
            }
            .开奖中 {
                flex-grow: 1;
            }
        }
    }
}
.圆球 {
    font-size: _vw(12);
    width: _vw(20);
    height: _vw(20);
    border-radius: 100%;
    margin: 0px _vw(2);
    text-align: center;
    line-height: _vw(20);
    color: #ffffff;
    display: block;
    &.红{
        background: red;
    }
    &.蓝{
        background: #007fff;
    }
    &.绿{
        background: #34c604;
    }
}


.记录入口 {
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
