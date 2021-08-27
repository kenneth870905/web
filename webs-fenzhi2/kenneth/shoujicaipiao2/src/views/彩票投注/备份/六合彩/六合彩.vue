<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @click="返回()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <button class="btn_1" @click="选择类型()">
                    <!-- 朴素按钮 -->
                    {{玩法名称}}
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </button>
            </h1>
            <button @click="显示切换彩种=true" class="btn_2 mui-btn mui-btn-blue mui-btn-link mui-pull-right">
                {{当前彩种.name}}
                <i class="icon iconfont icon-icon-arrow-bottom2"></i>
            </button>
        </header>

        <qhcz v-show="显示切换彩种" />
        <qhwf v-show="显示切换玩法"/>
        <div class="mui-content ">
            <ul class="开奖头部">
                <li>
                    <div class="近期" @click="显示最近记录=!显示最近记录">
                        <img class="logo_1" src="https://tg-cdn2.gdbzh.com.cn/f71ce936-1bd7-4aef-9aa9-36f4504b343d.png" alt="">
                        <div>近期开奖</div>
                        <i class="icon iconfont icon-tubiaozhizuo-"></i>
                    </div>

                    <ul class="彩票上期">
                        <li>
                            <div>
                                <span class="圆球 红色">01</span>
                                <div class="生肖">猪</div>
                            </div>
                            <div>
                                <span class="圆球 红色">02</span>
                                <div class="生肖">猪</div>
                            </div>
                            <div>
                                <span class="圆球 蓝色">03</span>
                                <div class="生肖">猪</div>
                            </div>
                            <div>
                                <span class="圆球 蓝色">04</span>
                                <div class="生肖">猪</div>
                            </div>
                            <div>
                                <span class="圆球 绿色">05</span>
                                <div class="生肖">猪</div>
                            </div>
                            <div>
                                <span class="圆球 绿色">06</span>
                                <div class="生肖">猪</div>
                            </div>
                            <div>
                                <span>+</span>
                            </div>
                            <div>
                                <span class="圆球 红色">07</span>
                                <div class="生肖">猪</div>
                            </div>
                        </li>
                        <!-- <li>
                            <span  class="圆球">03</span>
                            <span  class="圆球">09</span>
                            <span  class="圆球">07</span>
                            <span  class="圆球">05</span>
                            <span  class="圆球">10</span>
                        </li> -->
                    </ul>
                </li>
                <li>
                    <div>距20190527964期截止</div>
                    <div>
                        00:00:30
                    </div>
                </li>

                <div class="记录" v-show="显示最近记录">
                    <div class="遮罩" @click="显示最近记录=!显示最近记录"></div>
                    <ul>
                        <li class="item">
                            <div class="期数">期数</div>
                            <div class="开奖号">开奖号</div>
                        </li>
                        <li class="item">
                            <div class="期数2">20190527995</div>
                            <div class="开奖中">
                                开奖中...
                            </div>
                        </li>
                        <li class="item" v-for="(item, index) in 30" :key="index">
                            <div class="期数2">20190527995</div>
                            <div class="开奖号2">
                                <div>
                                    <span class="圆球 红色">01</span>
                                    <div class="生肖">猪</div>
                                </div>
                                <div>
                                    <span class="圆球 红色">02</span>
                                    <div class="生肖">猪</div>
                                </div>
                                <div>
                                    <span class="圆球 蓝色">03</span>
                                    <div class="生肖">猪</div>
                                </div>
                                <div>
                                    <span class="圆球 蓝色">04</span>
                                    <div class="生肖">猪</div>
                                </div>
                                <div>
                                    <span class="圆球 绿色">05</span>
                                    <div class="生肖">猪</div>
                                </div>
                                <div>
                                    <span class="圆球 绿色">06</span>
                                    <div class="生肖">猪</div>
                                </div>
                                <div>
                                    <span>+</span>
                                </div>
                                <div>
                                    <span class="圆球 红色">07</span>
                                    <div class="生肖">猪</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </ul>

            <div class="记录入口">
                <span>开奖记录</span>
            </div>

            <!-- 选择号码 -->
            <!-- <xuanhao /> -->
            <div v-for="(item, index) in 选号列表" :key="index">
                <style1 v-if="item.style==1" :name="item.name" :显示头部="!item.notitle" :选号="item.选号"/>
                <style2 v-if="item.style==2" :name="item.name" :选号="item.选号"/>
                <style3 v-if="item.style==3" :name="item.name"/>
            </div>

        </div>
    </div>
</template>

<script>

// import xuanhao from './components/pk10选号.vue'
import qhcz from '@/views/彩票投注/切换彩种.vue';
import qhwf from '@/views/彩票投注/切换玩法.vue';

import style1 from "@/components/彩票选票/样式1.vue";
import style3 from "@/components/彩票选票/样式3.vue";
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    name: "",
    components: {
        qhcz,
        qhwf,
        style1,
        style3
        // xuanhao
    },
    provide() {
        return {
            隐藏切换彩种: () => {
                this.显示切换彩种 = false;
            },
            隐藏切换玩法:() =>{
                this.显示切换玩法=false;
            }
        }
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
            当前玩法: state => state.投注.玩法,
            彩种: state => state.投注.彩种,
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
        //     var obj = this.玩法.find(x => x.value == this.当前玩法[0])
        //     var obj_1 = obj.children.find(x => x.value == this.当前玩法[1]);
        //     return obj.text + '-' + obj_1.text;
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
        }
    },
    methods: {
        ...mapMutations({
            设置state: "投注/设置state"
        }),
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
    display: flex;
    min-height: _vw(70);
    
    position: sticky;
    top: 44px;
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
    &.红色{
        background: red;
    }
    &.蓝色{
        background: #007fff;
    }
    &.绿色{
        background: #34c604;
    }
}


.记录入口 {
    font-size: _vw(12);
    text-align: right;
    padding: _vw(5) 0px;
    color: #8f9ab5;
    span {
        padding: 0px _vw(15);
        display: inline-block;
        height: _vw(20);
        line-height: _vw(20);
        border-top-left-radius: _vw(20);
        border-bottom-left-radius: _vw(20);
        background: #cccccc;
    }
}
</style>
