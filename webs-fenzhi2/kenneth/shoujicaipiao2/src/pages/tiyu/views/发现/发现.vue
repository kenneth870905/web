<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">发现你想要的</h1>
            <button @click="打开侧导航()" class="btn_2 mui-btn mui-btn-blue mui-btn-link mui-pull-right">
                <van-icon name="wap-nav" />
            </button>
        </header>
        <div class="mui-content mui-fullscreen">

            <div class="最新中奖">
                <img class="bg" @click="$router.push('/yxdt')" :src="config.img_url+'static/image/discovery/discovery_3.png'" alt="" srcset="">
                <div class="content_1">
                    <div class="swiper-container swiper_1" ref="swiper1">
                        <div class="swiper-wrapper">
                            <div @click="跳转游戏(item)" class="swiper-slide item" v-for="(item, index) in 中奖号码.winList" :key="index">
                                <span>{{item.UserName}}</span>
                                <span class="中奖">喜中{{item.Money}}元</span>
                                <span class="游戏名称">{{item.GameName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="新手指南" @click="显示新手指南=true">
                <img :src="config.img_url+'static/image/discovery/discovery_4.png'" alt="" srcset="">
            </div>

            <div class="标题">
                竞彩前线
            </div>
            <ul class="list1">
                <li @click="$router.push('/kaijiang')">
                    <img :src="config.img_url+'static/image/discovery/discovery_5.png'" alt="" srcset="">
                </li>
                <li @click="$router.push('/kjzs')">
                    <img :src="config.img_url+'static/image/discovery/discovery_6.png'" alt="" srcset="">
                </li>
            </ul>
            <div class="标题">
                平台推荐
            </div>
            <ul class="list1">
                <!-- <li @click="$router.push('/my/tghb')"> -->
                <li @click="$router.push('/agent/generalizeAdmin')">
                    <img :src="config.img_url+'static/image/discovery/discovery_12.png'" alt="" srcset="">
                </li>
                <!-- <li @click="$router.push('/yeb/yeb')"> -->
                <li @click="$router.push('/yeb/yeb')">
                    <img :src="config.img_url+'static/image/discovery/discovery_13.png'" alt="" srcset="">
                </li>
                <li>
                    <img :src="config.img_url+'static/image/discovery/discovery_14.png'" alt="" srcset="">
                </li>
            </ul>

            <div class="标题">咨询平台</div>
            <ul class="list1">
                <li @click="$router.push('/zx/zx')">
                    <!-- <li @click="$toast('暂未开放，敬请期待')"> -->
                    <img :src="config.img_url+'static/image/discovery/discovery_8.png'" alt="" srcset="">
                </li>

                <li @click="$router.push('/helpCenter')">
                    <img :src="config.img_url+'static/image/discovery/discovery_9.png'" alt="">
                </li>
            </ul>

            <div class="标题">彩票规则</div>
            <ul class="list1">
                <li @click="$router.push('/rule')">
                    <img :src="config.img_url+'static/image/discovery/discovery_10.png'" alt="" srcset="">
                </li>
                <li @click="$router.push('/setting')">
                    <img :src="config.img_url+'static/image/discovery/discovery_11.png'" alt="">
                </li>
            </ul>
        </div>

        <xszl v-if="显示新手指南" />
    </div>
</template>

<script>
import { api_最新中奖 } from "@/api/中奖接口.js";

import Swiper from 'swiper'
import Mock from 'mockjs'
import { mapState, mapActions } from 'vuex';
const xszl = () => import('@/components/新手指南.vue')
export default {
    name: "",
    components: {
        xszl
    },
    inject: ['打开侧导航'],
    provide() {
        return {
            关闭新手指南: () => {
                this.显示新手指南 = false
            }
        }
    },
    data() {
        return {
            显示新手指南: false,
            中奖号码: []
        }
    },
    computed: {
        ...mapState({
            config: "config",
            游戏彩票类型: '游戏彩票类型'
        }),
    },
    methods: {
        ...mapActions({
            获取游戏彩票: "获取游戏彩票"
        }),
        设置Swiper() {
            var swiper = new Swiper(this.$refs.swiper1, {
                direction: 'vertical',
                // slidesPerView : 'auto',
                slidesPerView: 4,
                loop: true,
                autoplay: 1000,
                autoplayDisableOnInteraction: false,
                // autoplay: {
                //     delay: 500,//1秒切换一次
                // },
                speed: 1000,
            });
        },
        跳转游戏(item) {
            //部分是手动添加的不是彩票
            if(item.Code){
                if(this.config.newbet){
                    this.$router.push(`/buyLottery?i=${item.Code}`)
                }else{
                    this.$router.push('/cpiframe?i='+item.Code)
                }
            }
        },
        随机中奖(){
            //获取所有游戏类型
            var list1 = [];
            this.游戏彩票类型.map((x) => {
                if (x.title == '彩票') return
                x.children.map((y) => {
                    list1.push(y.title)
                })
            })
            // Math.floor(Math.random()*(max-min+1)+min);
            var list2 = [];
            for (let i = 0; i < 20; i++) {
                // 随机一个游戏
                var UserName = ''
                if (i % 3 == 0) {
                    UserName = '1' + Mock.Random.integer(3, 9).toString() + Mock.Random.integer(0, 9).toString()
                    UserName += '****'
                    UserName += Mock.Random.integer(0, 9).toString() + Mock.Random.integer(0, 9).toString()
                } else {
                    UserName = Mock.Random.string('lower', 3) + '****' + Mock.Random.integer(0, 9).toString() + Mock.Random.integer(0, 9).toString()
                }
                let suiji_1 = Math.floor(Math.random() * (list1.length - 1 - 0 + 1) + 0);
                list2.push({
                    Money: Math.floor(Math.random() * (20000 - 1000 + 1) + 1000),
                    UserName: UserName,
                    GameName: list1[suiji_1].replace('大厅', '')
                })
            }
            return list2
        },
        async init() {
            console.log('init')
            var r1 = await api_最新中奖()
            this.中奖号码 = r1.data;
            if (this.游戏彩票类型.length == 0) {
                await this.获取游戏彩票();
            }
            var list2 = []
            if(sessionStorage.winList){
                // {tiem:'',list:[]} 保存的格式
                var win = {
                        time:0
                    }
                try {
                    win = JSON.parse(sessionStorage.winList);
                } catch (error) {}
                var t1 = new Date().getTime();
                var t2 = win.time;
                //还在5分钟之内
                if(t1 > t2+60*5*1000){
                    list2 = this.随机中奖();
                    var w = {
                            time:new Date().getTime(),
                            list:list2
                        }
                    sessionStorage.winList = JSON.stringify(w)
                }else{
                    list2 = win.list || [];
                }
            }else{
                list2 = this.随机中奖();
                var w = {
                        time:new Date().getTime(),
                        list:list2
                    }
                sessionStorage.winList = JSON.stringify(w)
            }
            
            var this_1 = this;
            list2.forEach(function (item, index) {
                let suiji_2 = Math.floor(Math.random() * (3 - 1 + 1) + 1);
                this_1.中奖号码.winList.splice(suiji_2 * (index + 1) + index, 0, item);
            });
            this.$nextTick(() => {
                this.设置Swiper();
            })
        }
    },
    mounted() {
        this.init()
    },
}
</script>

<style lang="scss" scoped>
.mui-bar-nav {
    background-image: url("~@/assets/bg/discovery_1.png");
    background-size: 100% auto;
    background-position: 0 bottom;
    box-shadow: none;
    .btn_2 {
        // position: absolute;
        // right: 0px;
        // top: 0px;
        font-size: 26px;
        display: flex;
        align-items: center;
        height: 100%;
        i {
            display: block;
        }
    }
}
.mui-content {
    overflow: auto;
    padding-bottom: _vw(20);
    background-image: url("~@/assets/bg/discovery_2.jpg");
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: 0px 44px;
}

.最新中奖 {
    position: relative;
    min-height: _vw(211);
    .bg {
        width: 100%;
    }
    .content_1 {
        position: absolute;
        width: 100%;
        // height: 100%;
        top: 0px;
        left: 0px;
        // padding: _vw(100) _vw(17) _vw(20);
        padding: 0px _vw(17);
        top: _vw(100);
        bottom: _vw(20);

        color: #ffffff;
        font-size: _vw(12);
        .swiper_1 {
            height: 100%;
        }
        .item {
            border-bottom: 1px solid #9823d4;
            display: flex;
            justify-content: space-between;
            height: auto;
            padding-top: _vw(2);
            padding-bottom: _vw(2);
            span {
                width: 33.3%;
            }
            .游戏名称 {
                width: 80px;
            }
            .中奖 {
                color: #fbeabf;
            }
        }
    }
}

.新手指南 {
    padding: 0px _vw(5);
    font-size: 0px;
    img {
        width: 100%;
    }
}
.标题 {
    padding: _vw(12) _vw(15);
    font-size: _vw(18);
    color: #2c2c38;
    font-size: _vw(18);
    font-weight: bold;
}
.list1 {
    padding: 0px _vw(15);
    display: flex;
    justify-content: space-between;
    li {
        padding: 0px _vw(2);
    }
    img {
        width: 100%;
    }
}
</style>
