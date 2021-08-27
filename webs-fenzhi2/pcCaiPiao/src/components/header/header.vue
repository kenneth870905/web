<template>
<div class="header">
    <div class="header_top">
        <div class="container">
            <div class="header_top_left">欢迎光临{{vuexconfig.title}}</div>
            <div class="header_top_right">
                <ul>
                    <li @click="playTest()" v-if="!userInfo.UserId">免费试玩</li>
                    <!-- <li>加入收藏</li> -->
                    <li>
                        <router-link to="/playRule">玩法规则</router-link>
                    </li>
                    <li @click="$router.push('/contactus')">
                        联系我们
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <showTitle v-if="userInfo.UserId"></showTitle>
    <shouLogin v-if="!userInfo.UserId"></shouLogin>
    <div class="header_nav">
        <div class="container">
            <div class="container_left">
                <!-- nav导航栏左侧 -->
                <div class="container_left_title">
                    <div>热门彩种 </div>
                    <div><span class="iconfont icon-mulu"></span></div>
                </div>
                <!-- nav导航栏左侧 hove菜单 -->
                <navSon class="侧面1" v-if="$route.path!='/'"></navSon>
            </div>
            <!-- nav导航栏右侧 -->
            <div class="container_right">
                <ul>
                    <li v-if="item.url!='/phone' || (item.url=='/phone' && 站点配置.appUrl) " v-for="(item, index) in config.navigation_list" :key="index" :class="{'lottry_a':item.childrenIn.length>0,'activecls':selectLab ==item.url}">
                        <!-- <li v-for="(item, index) in config.navigation_list" :key="index" @click="clickTitle(item.url)" :class="{'lottry_a':item.children.length>0,'activecls':selectLab ==item.url}"> -->
                        <p @click="clickTitle(item)" :class="{'appClass':item.name=='APP'}">
                            <span>{{item.name}}</span>
                        </p>
                        <div class="i_box" v-if="item.rm || item.图标">
                            <i class="icon" :class="item.rm" v-if="item.rm"></i>
                            <i class="icon" :class="item.图标" v-if="item.图标"></i>
                        </div>

                        <ul class="son_ul" v-if="item.childrenIn.length>0">
                            <li class="son_ul_li" v-for="(item2, index) in item.childrenIn" :key="index" @click="goURL(item2 , item)">
                                <div class="son_ul_li_img"><img :src="item2.minImg" alt=""></div>
                                <p class="">{{item2.minName}}</p>
                                <!-- <div class="son_ul_li_btn" v-if="config.nav_btn">立即游戏</div> -->
                            </li>
                        </ul>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    api_登录试玩
} from "@/api/请求登录的接口.js";
import navSon from '@/components/navSon/navSon.vue' //子导航组件
import showTitle from '@/components/showTitle/showTitle.vue' //登录后头部
import shouLogin from '@/components/shouLogin/shouLogin.vue' //登录头部
import {
    mapMutations,
    mapGetters,
    mapActions,
    mapState
} from "vuex";
// import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            config: config,
            selectLab: "/", //默认路径  
            定时器: '',
            dataconfig: {
                api_urlData: config.api_url, //api_url
                // title: config.title//titleKey
            },
        }
    },
    computed: {
        ...mapGetters({
            userInfo: "userInfo",
            站点配置: '站点配置',
        }),
        ...mapState({
            vuexconfig: 'config'
        })
    },
    mounted() {
        console.log(this.$route.path)
    },
    methods: {
        ...mapMutations({
            修改state: '修改state'
        }),
        ...mapActions({
            getUserInfo: "getUserInfo",
            获取平台余额: '获取平台余额',
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框',
        }),
        goURL(item, item1) {
            console.log(item)
            if (item.url_type == 1) {
                window.open(item.url, 'pcCaiPiao')
            } else {
                if (!item.tk) {
                    this.selectLab = item1.url;
                    this.$router.push(item.url)
                } else {
                    console.log('弹框')
                    var obj = Object.assign({}, item)
                    this.修改state(['Moneymin', ''])
                    this.修改state(['Aname', ''])
                    var obj = {
                        name: item.minName,
                        查询类型: item.type,
                        gid: item.gid
                    }
                    this.设置待进入游戏(obj)
                    this.设置进入游戏弹框(true)
                    // this.获取平台余额(item.type)
                }
            }
        },
        clickTitle(item) {
            console.log(item);
            if (item.url) {
                if (item.url_type == 1) {
                    window.open(item.url, item.url)
                } else {
                    this.selectLab = item.url;
                    this.$router.push(item.url)
                }
            }
        },

        playTest() { //点击试玩触发得函数
            // this.显示试玩弹框=true;
            api_登录试玩().then(x => {
                if (x.data.code == 0) {

                    this.getUserInfo()
                } else {
                    this.$message.success(x.data.msg);
                }

            }).catch(err => {
                console.log(err);
            })
            //点击试玩体验触发的函数
            // alert("点击试玩体验触发的函数");
        },
    },
    components: { // 注册组件
        navSon,
        showTitle,
        shouLogin,
    },
    //解决导航激活样式刷新后自动套到首页的问题
    watch: { //this.$route.path 代表当前路由状态
        $route(to, from) {
            if (this.selectLab == '/') {
                this.selectLab = this.$route.path
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.侧面1 {
    display: none;
}

.header_top_left {
    margin-right: 10px;
}

.appClass {
    padding-left: 20px;
}

.activecls {
    background: #da1b25;
}

html,
body {
    padding: 0px;
    margin: 0px;
}

p {
    margin: 0px;
}

.header {
    width: 100%;

    //header-top
    .header_top {
        width: 100%;
        background-color: #f3f3f3;

        .container {
            height: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            color: #333333;

            .header_top_right {
                ul {
                    display: flex;

                    li:hover {
                        color: red;
                        text-decoration: underline;
                    }

                    li {
                        padding: 0px 10px;
                        cursor: pointer;
                        position: relative;

                        &:not(:nth-child(1)) {
                            &::after {
                                content: "";
                                position: absolute;
                                left: 0px;
                                top: 0px;
                                bottom: 0px;
                                width: 1px;
                                height: 50%;
                                margin: auto;
                                background: #545454;
                            }
                        }

                        a:hover {
                            color: red;
                            text-decoration: underline;
                        }

                        a {
                            color: #333333;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }

    .header_nav {
        position: relative;
        height: 45px;
        background: #e94335;

        .container {
            // position: relative;
            height: 45px;
            display: flex;
            justify-content: space-between;
            color: #ffffff;
            font-weight: 500;
            font-size: 19px;

            .container_left:hover .侧面1 {
                display: block;
            }

            .container_left {
                cursor: pointer;
                z-index: 1;
                position: relative;
                margin-right: 10px;
                // height: 45px;
                width: 240px;
                background: #ffffff !important;

                .container_left_title {
                    width: 212px;
                    padding: 0px 16px 0px 16px;
                    background: #da1b25;
                    height: 45px;
                    line-height: 45px;
                    display: flex;
                    justify-content: space-between;

                    .icon-mulu {
                        font-size: 19px;
                    }
                }
            }

            .container_right {
                height: 45px;
                line-height: 45px;
                width: 750px;
                background: #e94335;

                p {
                    cursor: pointer;
                }

                >ul {
                    height: 45px;
                    display: flex;
                    padding-left: none !important;

                    // justify-content: flex-end;
                    >li:hover .son_ul {
                        display: flex;
                    }

                    >li {
                        height: 45px;
                        width: 122px;
                        text-align: center;
                        font-size: 16px;

                        // >p:hover{
                        // }
                        .son_ul {
                            position: absolute;
                            align-items: center;
                            justify-content: center;
                            top: 44px;
                            left: 2px;
                            // z-index: 40;
                            z-index: 21;
                            width: 100%;
                            margin: 0 auto;
                            background: rgba(255, 255, 255, 0.95);
                            box-shadow: 0px 2px 10px 1px #cacaca;
                            // background: green;
                            // height: 160px;
                            display: none;

                            .son_ul_li {
                                cursor: pointer;
                                padding-top: 12px;
                                box-sizing: border-box;
                                // width: 120px;
                                width: 100px;

                                .son_ul_li_img {
                                    box-sizing: border-box;
                                    margin: 0px auto;
                                    width: 90px;
                                    height: 90px;
                                    border-radius: 10px;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }

                                p {
                                    margin: 0px;
                                    text-align: center;
                                    font-size: 14px;
                                    color: black;
                                    line-height: initial;
                                    padding-bottom: 8px;
                                }

                                .son_ul_li_btn {
                                    box-sizing: border-box;
                                    margin-left: 10px;
                                    height: 30px;
                                    width: 100px;
                                    border-radius: 25px;
                                    background: #da1b25;
                                    color: #ffffff;
                                    font-size: 18px;
                                    text-align: center;
                                    line-height: 30px;
                                    font-weight: 500;
                                }
                            }
                        }

                        .i_box {
                            // background: goldenrod;
                            // height: 5px;
                            position: relative;

                            .icon-shouji {
                                color: #ffffff;
                                position: absolute;
                                top: -47px;
                                left: 14px;
                                font-size: 20px;
                            }

                            .icon-xiangxia {
                                color: #ffffff;
                                position: absolute;
                                top: -43px;
                                left: 74%;
                                font-size: 12px;
                                // display: biock;
                            }

                            .icon-hot- {
                                color: rgb(255, 255, 0);
                                position: absolute;
                                top: -61px;
                                left: 60%;
                                font-size: 16px;
                            }
                        }
                    }

                    .lottry_a:hover div {
                        display: block !important;
                        position: relative !important;
                        z-index: 12 !important;
                    }

                    .lottry_a {
                        height: 45px;

                        p {
                            cursor: pointer;
                        }

                        .son_ul {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
