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
                            </div>
                            <div>
                                <span class="圆球 红色">02</span>
                            </div>
                            <div>
                                <span class="圆球 红色">03</span>
                            </div>
                        </li>
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
                                </div>
                                <div>
                                    <span class="圆球 红色">02</span>
                                </div>
                                <div>
                                    <span class="圆球 红色">03</span>
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
                    text: '三码',
                    children: [
                        {name:"直选",children:[
                            { value: '0', text: "直选和值",投注列表:[
                                {style:1,name:'选号',notitle:true,选号:[1,'2','3','4','5','6','7','8','9','10','11',12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]},
                            ]},
                            { value: '1', text: "复式",投注列表:[
                                {style:1,name:'百位',选号:[1,'2','3','4','5','6','7','8','9']},                                
                                {style:1,name:'十位',选号:[1,'2','3','4','5','6','7','8','9']},                                
                                {style:1,name:'个位',选号:[1,'2','3','4','5','6','7','8','9']},                                
                            ]},
                            { value: '2', text: "单式",投注列表:[]},
                        ]},
                        {name:"组选",children:[
                            { value: '3', text: "组三",投注列表:[
                                {style:1,name:'组三',选号:[1,'2','3','4','5','6','7','8','9']},                                
                            ]},
                            { value: '4', text: "组六",投注列表:[
                                {style:1,name:'组六',选号:[1,'2','3','4','5','6','7','8','9']},                                
                            ]},
                        ]}
                    ]
                },
                {
                    value:"1",
                    text:"二码",
                    children:[
                        {name:"后二码直选",children:[
                            { value: '0', text: "直选和值",投注列表:[
                                {style:1,name:'选号',notitle:true,选号:[1,'2','3','4','5','6','7','8','9','10','11',12,13,14,15,16,17,18]},
                            ]},
                            { value: '1', text: "复式",投注列表:[
                                {style:1,name:'十位',选号:[1,'2','3','4','5','6','7','8','9']},                                
                                {style:1,name:'个位',选号:[1,'2','3','4','5','6','7','8','9']},
                            ]},
                            { value: '2', text: "单式",投注列表:[]},
                        ]},
                        {name:"后二码组选",children:[
                            { value: '3', text: "复式",投注列表:[
                                {style:1,name:'组选',选号:[1,'2','3','4','5','6','7','8','9']},
                            ]},
                            { value: '4', text: "单式",投注列表:[]},
                        ]},
                        {name:"前二码直选",children:[
                            { value: '5', text: "直选和值",投注列表:[
                                {style:1,name:'选号',notitle:true,选号:[1,'2','3','4','5','6','7','8','9','10','11',12,13,14,15,16,17,18]},
                            ]},
                            { value: '6', text: "复式",投注列表:[
                                {style:1,name:'百位',选号:[1,'2','3','4','5','6','7','8','9']},
                                {style:1,name:'十位',选号:[1,'2','3','4','5','6','7','8','9']},
                            ]},
                            { value: '7', text: "单式",投注列表:[]},
                        ]},
                        {name:"前二码组选",children:[
                            { value: '8', text: "复式",投注列表:[
                                {style:1,name:'组选',选号:[1,'2','3','4','5','6','7','8','9']},
                            ]},
                            { value: '9', text: "单式",投注列表:[]},
                        ]},
                    ]
                },
                {   
                    value:"2",
                    text:"定位胆",
                    children:[
                        {name:"定位胆",children:[
                            {value:"0",text:"定位胆",投注列表:[
                                {style:1,name:'百位',选号:[1,'2','3','4','5','6','7','8','9']},
                                {style:1,name:'十位',选号:[1,'2','3','4','5','6','7','8','9']},
                                {style:1,name:'个位',选号:[1,'2','3','4','5','6','7','8','9']},
                            ]},
                        ]},
                    ]
                },
                {value:"3",text:"不定胆",children:[
                    {name:"不定胆",children:[
                        {value:"0",text:"一码不定胆",投注列表:[
                            {style:1,name:'选号',选号:[1,'2','3','4','5','6','7','8','9']},
                        ]},
                    ]},
                ]},
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
            // display: flex;
            // align-items: center;
            // justify-content: center;
            >li{
                display: flex;
                justify-content: center
            }
            .大小{
                font-size: -vw(13)
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
            color: $color;
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
                // .加减{
                //     font-size: 12px
                // }
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
    margin: 0px _vw(1);
    text-align: center;
    line-height: _vw(20);
    color: #ffffff;
    background: $color;
    display: block;
    // &.蓝色{
    //     background: #007fff;
    // }
    // &.绿色{
    //     background: #34c604;
    // }
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
