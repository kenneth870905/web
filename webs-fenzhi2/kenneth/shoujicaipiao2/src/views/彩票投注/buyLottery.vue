<template>
<div class="主界面  mui-fullscreen">
    <header class="mui-bar mui-bar-nav">
        <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">
            <button class="btn_1" @click="选择类型()">
                <!-- 朴素按钮 -->
                {{玩法一级.Label}}--{{玩法三级.Label}}
                <i class="icon iconfont icon-tubiaozhizuo-"></i>
            </button>
        </h1>
        <button @click="显示菜单=true" class="btn_2 mui-btn mui-btn-blue mui-btn-link mui-pull-right">
            <!-- {{当前彩种 ? 当前彩种.title : ''}} -->
            菜单
            <i class="icon iconfont icon-icon-arrow-bottom2"></i>
        </button>
    </header>

    <!-- 切换彩种 -->
    <qhcz v-show="显示切换彩种" />
    <!-- 切换玩法 -->
    <qhwf v-show="显示切换玩法" />

    <transition :name="transitionName">
        <!-- <div v-if="(!近期开奖 || 近期开奖.length==0) && init" class="mui-content 封盘"> -->
        <div v-if="封盘 && init" class="mui-content 封盘">
            <img :src="config.img_url+'static/image/LotteryStop.png'" alt="" srcset="">
        </div>
        <!-- <div class="内容 mui-content" v-if="显示子页面 && 近期开奖 && init"> -->
        <div class="内容 mui-content" v-if="显示子页面 && !封盘">
            <router-view :is="开奖头部"></router-view>

            <div class="记录入口">
                <div>
                    ￥
                    <span class="红色字体">{{userinfo.Money}}</span>
                </div>
                <span v-show="当前彩种.id==70002" class="直播按钮"  @click="显示直播=!显示直播">{{显示直播 ? '关闭观看' : "观看直播"}}</span>
                <div class="历史按钮" @click="$router.push(`/kjzs?id=${当前彩种.id}`)">{{当前彩种.title}}历史</div>
            </div>
            <!-- 开奖直播 -->
            <kaiJiangZhiBo v-if="显示直播"/>
            
            <div class="选号区">
                <!-- 主要正对官方玩法 -->
                <div class="组数" v-if="选号配置.官方玩法投注">
                    <span v-if="选号配置.官方玩法投注.显示赔率">倍率：
                        {{赔率}}
                    </span>
                    <span v-if="选号配置.官方玩法投注.显示组数">
                        已选：{{选号配置.官方玩法投注.注数}}组
                    </span>
                </div>
                <!-- 选择号码 -->
                <template v-if="选号配置.list">
                    <div class="选号" v-if="选号配置.list.length>0">
                        <div v-for="(item , index) in 选号配置.list" :key="index">
                            <wzys v-if="item.style=='位置'" name="位置" :位置="item.选号" />
                            <style1 v-if="item.style==1" :name="item.name" :显示头部="!item.notitle" :row="index" :选号="item.选号" :max="item.max" />
                            <style2 v-if="item.style==2" :name="item.name" :显示头部="!item.notitle" :选号="item.选号" />
                            <style3 v-if="item.style==3" :name="item.name" :显示头部="!item.notitle" :选号="item.选号" :max="item.max" />

                            <fangxing3 v-if="item.style=='方形3'" :name="item.name" :选号="item.选号" :max="item.max" />
                            <fangxing4 v-if="item.style=='方形4'" :name="item.name" :选号="item.选号" :max="item.max" />
                            <fangxing5 v-if="item.style=='方形5'" :name="item.name" :选号="item.选号" />
                        </div>
                    </div>
                    <srxh v-if="选号配置.list.length==0" />
                </template>
            </div>

            <div class="官信底部">
                <router-link :is="底部"></router-link>
            </div>
        </div>
    </transition>

    <!-- 官方购物车 -->
    <gfgwc v-if="官方购物车.show" />

    <!-- 确认弹框 -->
    <qr v-if="显示确认投注" />
    <!-- 头部菜单 -->
    <headerMenu v-if="显示菜单" />

    <xfal v-if="购彩助手" />

    <!-- <div class="六合彩遮罩" v-show="游戏id==70001">
        <div>
            <div class="img_box">
                <img src="static/image/香港马会gif.gif" alt="" srcset="" @click="g()">
            </div>
            <van-button size="small" type="danger" @click="g()">前往极速六合</van-button>
        </div>
    </div> -->
</div>
</template>

<script>
const style1 = () => import("@/components/彩票选票/样式1.vue");
const style2 = () => import("@/components/彩票选票/样式2.vue");
const style3 = () => import("@/components/彩票选票/样式3.vue");

const fangxing3 = () => import("@/components/彩票选票/方形3.vue");
const fangxing4 = () => import("@/components/彩票选票/方形4.vue");
const fangxing5 = () => import("@/components/彩票选票/方形5.vue");
const srxh = () => import('./components/输入选号.vue')
const wzys = () => import('@/components/彩票选票/位置样式.vue')
const gfgwc = () => import('./官方购物车.vue');
const qr = () => import('./确认弹框.vue');
const headerMenu = () => import('./components/头部菜单.vue')
const xfal = () => import('@/components/悬浮按钮.vue')
const kaiJiangZhiBo = () => import('./components/开奖直播.vue')

import qhcz from '@/views/彩票投注/切换彩种.vue';
import qhwf from '@/views/彩票投注/切换玩法.vue';
import {
    mapMutations,
    mapState,
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "",
    components: {
        headerMenu, //菜单
        xfal, //悬浮按钮
        qhcz, //彩种
        qhwf, //玩法
        qr, //购彩确认弹框
        gfgwc, //官方 购物车

        srxh, //手动输入选号
        wzys, //位置样式

        style1,
        style2,
        style3,

        fangxing3,
        fangxing4,
        fangxing5,

        kaiJiangZhiBo, //开奖直播
    },
    provide() {
        return {
            隐藏菜单: () => {
                console.log('隐藏菜单')
                this.显示菜单 = false
            },
            隐藏切换彩种: () => {
                this.显示切换彩种 = false;
            },
            隐藏切换玩法: () => {
                this.显示切换玩法 = false;
            }
        }
    },
    data() {
        return {
            显示菜单: false,
            显示切换彩种: false,
            显示切换玩法: false,
            显示子页面: true,
            开奖头部: '',
            底部: "",
            transitionName: "slide",
            显示直播:false
        }
    },
    computed: {
        ...mapState({
            config: 'config',
            userinfo: x => x.user.userinfo,
            游戏id: x => x.投注.彩票id,
            官信: x => x.投注.官信,
            玩法一级: x => x.投注.玩法一级,
            玩法二级: x => x.投注.玩法二级,
            玩法三级: x => x.投注.玩法三级,

            选号配置: x => x.投注.选号配置,
            显示确认投注: x => x.投注.显示确认投注,
            官方购物车: x => x.投注.官方购物车,
            购彩助手: x => x.user.偏好设置.购彩助手,
            即将开奖: x => x.投注.即将开奖,
            近期开奖: x => x.投注.近期开奖,
            init: x => x.投注.init
        }),
        ...mapGetters({
            当前彩种: '投注/当前彩种',
            封盘: '投注/封盘'
        }),
        赔率() {
            try {
                return this.玩法三级.Odds.join(',')
            } catch (error) {
                return this.玩法三级.Odds
            }
        }
    },
    methods: {
        ...mapMutations({
            设置state: '投注/设置state'
        }),
        ...mapActions({
            数据初始化: '投注/数据初始化',
            停止定时器: "投注/停止定时器"
        }),
        g() {
            this.$router.replace('/buyLottery?i=70000&t=2')
        },
        选择类型() {
            this.显示切换玩法 = true;
        },
        设置组件() {
            console.log('设置头部')
            var type = this.游戏id.substring(0, 2);
            this.开奖头部 = () => import('./头部/' + type + '_头部.vue');
            if (this.官信 == 1) {
                this.底部 = () => import('./底部/信用底部.vue');
            } else {
                this.底部 = () => import('./底部/官方底部.vue');
            }
        },
        // 给下级页面用的
        清空() {
            this.选号配置.list.forEach(item => {
                item.选号.forEach(x => {
                    // x.active=false;
                    this.$set(x, 'active', false)
                })
            });
        },
        初始化() {
            this.设置state(['彩票id', this.$route.query.i])
            this.设置state(['官信', (this.$route.query.t ? this.$route.query.t : 1)])
            this.数据初始化()
            this.设置组件()
        }
    },
    mounted() {
        this.初始化();
    },
    destroyed() {
        var url = this.$route.path
        if (url != '/shopping') {
            console.log('停止定时器')
            this.停止定时器()
            this.设置state(['玩法三级', ''])
            this.设置state(['选号配置', {}])
        }
    },
    watch: {
        $route() {
            this.设置state(['玩法三级', ''])
            this.初始化();
            this.显示子页面 = false;
            this.显示菜单 = false;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.显示子页面 = true;
                }, 500);
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.六合彩遮罩{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgba(0,0,0,0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: calc(44px + #{_vw(40)})  10px 10px;
    text-align: center;
    >div{
        background: #ffffff;
        padding: 5px;
        width: 100%;
    }
    .img_box{
        min-height: _vw(240);
    }
    img{
        width: 100%;
    }
}

.封盘{
    img{
        width: 100%;
    }
}
.红色字体{
    color: red;
}
.组数{
    padding: 0px _vw(10);
    color: red;
    font-size: _vw(14);
    line-height: _vw(32);
    // border-bottom: 1px solid #e8e8e8;
    // margin: 0px 0px _vw(10);
}
.选号{
    border-top: 1px solid #eeeeee;
}

.slide-enter, .slide-leave-to{
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100% 0);
}

// 内容 mui-content fade-leave-active fade-leave-to
// 内容 mui-content fade-enter-active fade-enter-to
.fade-enter, .fade-leave-to{
    opacity: 0;
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

.内容 {
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    transition: all 0.5s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.选号区 {
    flex-grow: 1;
    height: 100%;
    background: #ffffff;
    overflow: auto;
}
.主界面 {
    display: flex;
    flex-direction: column;
}

.记录入口 {
    flex-shrink: 0;
    font-size: _vw(12);
    display: flex;
    justify-content: space-between;
    padding: _vw(5) 0px;
    color: #676767;
    position: relative;
    div {
        padding: 0px _vw(15);
        display: inline-block;
        height: _vw(20);
        line-height: _vw(20);
        background: #ffffff;
    }
    div:nth-child(1) {
        border-top-right-radius: _vw(20);
        border-bottom-right-radius: _vw(20);
    }
    .历史按钮{
        border-top-left-radius: _vw(20);
        border-bottom-left-radius: _vw(20);
    }
    .直播按钮{
        color: red;
        position: absolute;
        width: 50px;
        height: 18px;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
    }
}

.官信底部 {
    flex-shrink: 0;
}
</style>
