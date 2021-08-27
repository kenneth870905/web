<template>
    <div class="nav" :class="{'定位':滚动条位置>140}">
        <div class="top_1">
            <top v-if="!userInfo.UserId"></top>
            <logintop v-if="userInfo.UserId"></logintop>
        </div>
        <div class="nav_box">
            <div class="container nav_div" @mouseleave="mouseleave_1()">
                <div class="logo" @click="$router.push('/')">
                    <!-- <img v-if="vuexConfig.logoType == '0' || !vuexConfig.logoType" :src="vuexConfig.logo" />
                    <logo v-if="vuexConfig.logoType =='1' "/> -->
                    <img src="static/pages/tiyu/image/hg-4-1-1.png" />
                </div>

                <div class="nav_div-routet">
                    <ul>
                        <li class="li_1" v-if="item.url!='/phone' || (item.url=='/phone' && 站点配置.appUrl) " v-for="(item, index) in config.navigation_list" :key="index">
                            <div @mouseover="mouseover_2($event, index)" @mousemove="mousemove_2($event)" :class="{'activecls':selectLab ==item.url}" @click="clickTitle(item)">
                                <div class="icon_box" v-if="item.icon">
                                    <span :class="item.icon"></span>
                                </div>
                                {{item.name}}
                                <div v-if="item.hot" class="icon_re_box">
                                    <i class="iconfont icon-remen3"></i>
                                </div>
                                <i v-if="item.children.length>0" class="el-icon-caret-bottom"></i>
                            </div>
                            <!-- 二级导航 -->
                            <div @mouseover="mouseover_3($event, index)" class="son_nav" v-show="index_2==index" :class="item.name" v-if="item.children.length>0">
                                <ul :class="{'son_end':item.style==1}">
                                    <li @click="进入游戏(item1)" :class="{'min_li':item1.style==1,'彩票':item.name=='彩票'}" v-for="(item1, index) in item.children" :key="index">
                                        <img :src="item1.img" alt>
                                        <!-- 只有彩票才文字 -->
                                        <div v-if="item.name=='彩票'">{{item1.name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <ul class="会员中心" v-if="userInfo.UserId">
                    <li v-if="!试玩" @click="$router.push('/iframe/deposit')">存款</li>
                    <li v-if="!试玩" @click="$router.push('/iframe/withdrawal')">提现</li>
                    <li @click="$router.push('/iframe/person')">会员中心</li>
                </ul>
                <ul class="注册登录" v-if="!userInfo.UserId">
                    <li>
                        <el-button @click="设置是否显示登录框(true)" class="login_btn" size="mini" round>用户登陆</el-button>
                    </li>
                    <router-link to="/register" tag="li">
                        <el-button class="register_btn" size="mini" round>免费开户</el-button>
                    </router-link>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// pointer-events
let mouseLocs = [];
const menuTopRight={x:0,y:75};
const menuBottomRight={x: 1200, y: 75}
function isTriangleRange(t1, t2, p1, p2) {
    var x = t2.x,
        y = t2.y,

        x1 = t1.x,
        y1 = t1.y,

        x2 = p1.x,
        y2 = p1.y,

        x3 = p2.x,
        y3 = p2.y,

        /**
         * (y2 - y1) / (x2 - x1)为两坐标连成直线的斜率
         * 因为直线的公式为 y=kx+b;
         * 当斜率相同时，只要比较 b1 和 b2 的差值就可以知道该点是在(x1,y1),(x2,y2)的直线的哪个方向,
         * 当r1大于0，说明该点在直线右侧，其它以此类推
         */
        r1 = y - y1 - (y2 - y1) / (x2 - x1) * (x - x1),
        r2 = y - y2 - (y3 - y2) / (x3 - x2) * (x - x2),
        r3 = y - y3 - (y1 - y3) / (x1 - x3) * (x - x3);
    return (r1 * r2 * r3 < 0) && (r1 > 0);
}


import logo from '@/components/logo.vue';

import { api_退出登录 } from '@/api/登录接口.js'
import top from './top.vue'
import logintop from './logintop.vue'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
export default {
    props: {// 父传子传参在 Header.js中用props接收  app.js传过来的窗口滚动距离
        滚动条位置: {
            default: 0
        }
    },
    components: {
        top,
        logintop,
        logo
    },
    data() {
        return {
            config: config,
            selectLab: '/', // 默认路径
            index_2:-1,
            index_1:-1,
            离开导航:true,
            timeouter:''
        }
    },
    computed: {
        ...mapGetters({// 获取vuex里的数据用mapGetters 就是vuex getters的内容
            登陆信息1: '登陆信息1',
            显示登录框: '显示登录框',
            userInfo: 'userInfo',
            试玩: '试玩',
            站点配置: '站点配置'
        }),
        ...mapState({
            vuexConfig: 'config'
        })
    },
    methods: {
        ...mapActions({// 获取vuex里的函数mapGetters
            设置是否显示登录框: '设置是否显示登录框',
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框'
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        mouseover_2(e,index){
            var container = document.querySelector('.nav_box');
            var nav_div=document.querySelector('.nav_div');
                // 坐标原点在 container 右上角
                var x = e.clientX - nav_div.offsetLeft
                var y = e.clientY - container.offsetTop;
                // console.log(x,y)
                mouseLocs.push({ x, y });
                if (mouseLocs.length > 3) {
                    mouseLocs.shift();
                }
                this.index_1=index

                let currentMenu = e.target;
                let isInTriRange;
                // subMenu 添加 show-block 类，让其显示
                // subMenu.className = 'sub-menu show-block';
                // 设置一个定时器

                try {
                    clearTimeout(this.timeouter)
                } catch (error) {}
                this.timeouter = null;
                try {
                    isInTriRange = isTriangleRange(mouseLocs[0], mouseLocs[2], menuTopRight, menuBottomRight);
                } catch (err) {}
                // 结果为 true，说明在三角区域内
                if (isInTriRange) {
                    if(this.index_2==-1){
                        this.index_2=this.index_1
                    }
                    this.timeouter = setTimeout( ()=>{
                        this.index_2=this.index_1
                    }, 1000)
                } else {
                    this.index_2=this.index_1
                }
        },
        mouseover_3(){
            try {
                    clearTimeout(this.timeouter)
                } catch (error) {}
                this.timeouter = null;
        },
        mousemove_2(e){
            var container = document.querySelector('.nav_box')
            var nav_div=document.querySelector('.nav_div');
                // 坐标原点在 container 右上角
                var x = e.clientX - nav_div.offsetLeft
                var y = e.clientY - container.offsetTop;
                // console.log(x,y,e.clientY)
                mouseLocs.push({ x, y });
                if (mouseLocs.length > 3) {
                    mouseLocs.shift();
                }
        },
        mouseleave_1(){
            this.index_2=-1
        },
        退出() {
            api_退出登录().then(x => {
                console.log(x)
            }).then(err => {
                console.log(err)
            })
        },
        clickTitle(item) {
            this.selectLab = title
            //   this.selectLab=this.$router.history.current.path
            // this.selectLab = title; //把他点击的对象保存起来判断如果对应上了就为真就添加激活样式
            // this.$router.history.push(title) // 点击跳转的对应地址
            if(item.url_type==1){
                window.open(item.url)
            }else{
                this.$router.push(item.url)
            }
        },
        进入游戏(item) {
            console.log(item)
            if (item.url_type == 1) {
                window.open(item.url, '_blank')
            } else {
                this.修改state(['Moneymin', ''])
                
                item.type = item.type
                // item.url_key=item.cname;
                // item.url_id=item.id;
                this.设置待进入游戏(item)
                this.设置进入游戏弹框(true)
            }
        },
        设置排序(){
            if(!this.vuexConfig.typeSort){
                return 
            }
            var typeSort = this.vuexConfig.typeSort;
            let origin = location.origin.toLowerCase(); //转小写
            let paixu = typeSort.find(x=>x.url.find(y=>origin.includes(y.toLowerCase())))
            if(paixu){
                let paixuList = paixu.sort
                // var list = []
                for (let i = paixuList.length-1; i >= 0; i--) {
                    let index_2 = this.vuexConfig.navigation_list.findIndex(x=>x.name.includes(paixuList[i]));
                    if(index_2!=-1){
                        this.vuexConfig.navigation_list.splice(1,0,...this.vuexConfig.navigation_list.splice(index_2,1))
                    }
                }
            }
        } 
    },
    mounted() { // mounted窗口一加载就执行的生命周期
        this.设置排序()
        // this.更新登陆信息1()
        // this.$set(target, key, value)
    },
    // 解决导航激活样式刷新后自动套到首页的问题
    watch: { // this.$route.path 代表当前路由状态
        $route(to, from) {
            if (this.selectLab == '/') {
                this.selectLab = this.$route.path
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@charset "utf-8";
.activecls {
    color: red;
    position: relative;
}

.nav {
    // min-width: 1200px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 3;
    .top_1 {
        transition: all 0.05s;
        overflow: hidden;
        height: 45px;
    }
}
.nav.定位 {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 3;
    .top_1 {
        height: 0px;
    }
    .nav_box {
        height: 50px;
        .nav_div {
            .nav_div-routet {
                ul {
                    // line-height: 50px;
                    font-size: 12px;
                    li {
                        .son_nav {
                            top: 49px;
                        }
                    }
                }
            }
            .注册登录 {
                display: flex;
            }
            .会员中心 {
                display: flex;
            }
        }
    }
}

.nav_box {
    background: #363636;
    height: 72px;
    position: relative;
    .nav_div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        //左边logo图片
        .logo {
            height: 100%;
            margin-right: 90px;
            padding: 5px 0px;
            >img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .nav_div-routet {
            height: 100%;
            width: 100%;
            ul {
                display: flex;
                justify-content: space-around;
                color: #fff;
                // line-height: 72px;
                font-size: 15px;
                width: 100%;
                height: 100%;
                li {
                    // border-left: 1px solid #ccc;
                    height: 100%;
                    display: flex;
                    flex-grow: 1;
                    justify-content: center;
                    //  position: relative;
                    box-sizing: border-box;
                    > div:nth-child(1) {
                        display: flex;
                        position: relative;
                        align-items: center;
                        cursor: pointer;
                        // width: 100%;
                        height: 100%;
                    }
                    > div:nth-child(1)::after {
                        position: absolute;
                        content: "";
                        width: 0%;
                        height: 3px;
                        left: 0px;
                        right: 0px;
                        bottom: 0px;
                        margin: auto;
                        background: red;
                        transition: all 0.3s;
                    }
                    > div:nth-child(1).activecls::after {
                        width: 100%;
                    }
                    .icon_box {
                        position: relative;
                        .el-icon-s-home {
                            //   position:absolute;
                            top: 24px;
                            right: 3px;
                            color: red;
                            font-size: 18px;
                        }
                    }
                    //  热门图标
                    .icon_re_box {
                        position: relative;
                        .icon-remen3 {
                            color: rgb(240, 53, 53);
                            font-size: 40px;
                            position: absolute;
                            top: -46px;
                            right: -29px;
                        }
                    }
                    .el-icon-mobile-phone {
                        font-size: 20px;
                    }

                    //  子导航部分
                    .son_nav {
                        box-shadow: 0px 0px 1px 1px #2d2d2d;
                        width: 100%;
                        margin: 0 auto;
                        // height: 150px;
                        position: absolute;
                        left: 0px;
                        top: 72px;
                        background: #363636;
                        border: none !important;
                        z-index: 11 !important;
                        padding-top: 10px;
                        &.棋牌{
                            // height: 105px;
                        }
                        // display: none;
                        // ul儿子靠右 覆盖类
                        .son_end {
                            display: flex;
                            justify-content: center;
                            li {
                                width: 280px;
                                flex-shrink: 1;
                                display: flex;
                                align-items: flex-end;
                                padding: 0px 3px;
                            }
                        }
                        &.电子游艺,
                        &.捕鱼{
                            ul{
                                flex-wrap: wrap;
                                .min_li{
                                    width: calc(100% / 8);
                                    flex-grow: 0;
                                }
                                // width: 1400px;
                            }
                        }
                        &.真人娱乐{
                            ul{
                                flex-wrap: wrap;
                                li{
                                    width: calc(100% / 5);
                                    flex-grow: 0;
                                }
                                // width: 1400px;
                            }
                        }
                        ul {
                            display: flex;
                            justify-content: flex-start;
                            margin: 0px auto;
                            width: 1200px;
                            height: 100%;
                            .min_li {
                                //li类覆盖
                                width: 160px;
                                padding-bottom: 10px;
                                img {
                                    max-width: 100%;
                                }
                            }
                            .min_li.彩票 {
                                flex-direction: column;
                                img {
                                    width: 85px;
                                    height: 85px;
                                    margin-bottom: 5px;
                                }
                            }

                            li:hover {
                                background: linear-gradient(
                                    rgba(24, 0, 249, 0.1),
                                    rgba(29, 21, 119, 0.9)
                                );
                                border-bottom: 2px solid #493be4;
                                img {
                                    transform: translate(2px, -2px);
                                }
                            }
                            li {
                                border-bottom: 2px solid #363636;
                                cursor: pointer;
                                background-size: 100% 100%;
                                width: 220px;
                                height: 100%;
                                display: flex;
                                transition: all 0.3s;
                                justify-content: center;
                                align-items: center;
                                img {
                                    object-fit: cover;
                                    max-width: 100%;
                                }
                            }
                        }
                    }
                }
                li:hover {
                    > div:nth-child(1) {
                        color: red;
                    }
                    > div:nth-child(1)::after {
                        width: 100%;
                    }
                }
                li:hover .son_nav {
                    display: block;
                }
            }
        }
        .注册登录 {
            display: none;
            align-items: center;
            flex-shrink: 0;
            .register_btn {
                background: rgb(155, 11, 11);
                color: #fff;
                border: none;
            }
            .login_btn {
                background: rgb(1, 146, 118);
                color: #fff;
                border: none;
                margin: 0px 5px;
            }
        }
        .会员中心 {
            background: rgba(165, 165, 200, 0.08);
            height: 32px;
            border-radius: 32px;
            color: #fff;
            display: none;
            align-items: center;
            white-space: nowrap;
            flex-shrink: 0;
            padding: 0px 5px;
            margin: 0px 0px 0px 10px;
            li {
                padding: 0px 10px;
                border-left: 1px solid #fff;
                cursor: pointer;
            }
            > li:nth-child(1) {
                border-left: none;
                color: #ffff00;
            }
        }
    }
}
</style>
