<template>
    <ul class="开奖头部">
        <li>
            <div class="近期" @click="显示最近记录=!显示最近记录">
                <img class="logo_1" :src="config.img_url+'static/image/home/caipiao/'+当前彩种.id+'.png'">
                <div>近期开奖</div>
                <i class="icon iconfont icon-tubiaozhizuo-"></i>
            </div>
            <ul class="上期开奖">
                <li v-if="近期开奖.length>0 && 近期开奖[0].Content && 近期开奖[0].Content.length>0">
                    <span class="圆球">{{近期开奖[0].Content[0]}}</span>
                    <span>+</span>
                    <span class="圆球">{{近期开奖[0].Content[1]}}</span>
                    <span>+</span>
                    <span class="圆球">{{近期开奖[0].Content[2]}}</span>
                    <span>=</span>
                    <span class="圆球" :class="计算和值(近期开奖[0].Content).color">{{计算和值(近期开奖[0].Content).和值}}</span>
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
                    <div class="大小">大小</div>
                    <div class="单双">单双</div>
                </li>
                <li class="item" v-for="(item, index) in 近期开奖" :key="index">
                    <div class="期数2">{{item.IssueCode.substring(4)}}</div>
                    <div v-if="item.Content" class="开奖号2">
                        <span class="圆球">{{item.Content[0]}}</span>
                        <span>+</span>
                        <span class="圆球">{{item.Content[1]}}</span>
                        <span>+</span>
                        <span class="圆球">{{item.Content[2]}}</span>
                        <span>=</span>
                        <span class="圆球" :class="计算和值(item.Content).color">{{计算和值(item.Content).和值}}</span>
                    </div>
                    <div v-if="item.Content" class="大小 font14">{{计算大小(item.Content)}}</div>
                    <div v-if="item.Content" class="单双 font14">{{计算单双(item.Content)}}</div>
                    <div v-else class="开奖中">
                        开奖中...
                    </div>
                </li>
            </ul>
        </div>
    </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name:"",
    data() {
        return {
            显示最近记录:false
        }
    },
    computed: {
        ...mapState({
            config:"config",
            近期开奖:state=>state.投注.近期开奖,
            即将开奖:state=>state.投注.即将开奖,
        }),
        ...mapGetters({
            当前彩种:'投注/当前彩种'
        })
    },
    methods: {
        计算和值(list){
            var 和值= list.reduce((n,m) => parseInt(n) + parseInt(m) );
            var 灰 = [0, 13, 14, 27];
            var 绿 = [1, 4, 7, 10, 16, 19, 22, 25];
            var 蓝 = [2, 5, 8, 11, 17, 20, 23, 26];
            var 红 = [3, 6, 9, 12, 15, 18, 21, 24];
            if(灰.includes(和值)){
                return {
                    和值:和值,
                    color:'灰'
                };
            }else if(绿.includes(和值)){
                return {
                    和值:和值,
                    color:'绿'
                };
            }else if(蓝.includes(和值)){
                return {
                    和值:和值,
                    color:'蓝'
                };
            }else if(红.includes(和值)){
                return {
                    和值:和值,
                    color:'红'
                };
            }
        },
        计算大小(list){
            var number=0;
            list.forEach(element => {
                number=number + parseInt(element);
            });
            return number >22 ? '大':'小';
        },
        计算单双(list){
            var number=0;
            list.forEach(element => {
                number=number + parseInt(element);
            });
            return number % 2 == 0 ? '双' : '单';
        },
    },
}
</script>

<style lang="scss" scoped>
.font14{
    font-size: _vw(14);    
}
.开奖头部 {
    flex-shrink: 0;
    display: flex;
    min-height: _vw(70);
    position: sticky;
    top: 0px;
    z-index: 1;
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
                justify-content: center
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
            color: $color;
        }
    }
    .记录 {
        z-index: 1;
        position: absolute;
        width: 100%;
        left: 0px;
        height: _vw(240);
        bottom: _vw(-240);
        overflow: auto;
        .遮罩 {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
        }
        > ul {
            position: relative;
            z-index: 1;
            background: #ffffff;
            height: 100%;
            overflow: auto;
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
                width: _vw(120);
                flex-shrink: 0;
                flex-grow: 0;
                line-height: _vw(30);
                border-right: 1px solid #cccccc;
            }
            .期数2 {
                font-size: _vw(12);
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
    border-radius: 100%;
    margin: 0px _vw(2);
    text-align: center;
    line-height: _vw(20);
    color: #ffffff;
    background: $color;
    display: block;
    &.灰{
        background: #6c757d ;
    }
    &.绿{
        background: #28a745;
    }
    &.蓝{
        background: #007bff;
    }
    &.红{
        background: $color;
    }
}
</style>
