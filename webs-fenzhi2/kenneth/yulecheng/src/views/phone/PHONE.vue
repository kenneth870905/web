<template>
    <div class="phone">
        <div class="phone_baner">
            <img class="bg_1" src="webConfig/image/phone_12.jpg" />
            <!-- <div class="container"> -->
                <div class="phoneCodeDiv">
                    <div class="img_box">
                        <img :src="站点配置.appUrl" alt>
                    </div>
                    <p>扫一扫进入手机站</p>
                </div>
            <!-- </div> -->
        </div>
        <!-- 游戏丰富一应俱全 -->
        <div class="abundant">
            <div class="container abundant_div ">
                <div>
                    <img src="image/phone/mob-pic-1-1.png" alt="">
                </div>
                <p>支持AG、MG国际、PT、BBIN、TTG、GG、DT、SW、YP、PP、PS、平博体育 平台的手机投注<br>
                    游戏囊括了真人、老虎机、捕鱼、街机电玩、体育赛事等热门种类，让您随时随地畅享游戏的精彩！</p>
                <ul>
                    <li><img src="image/phone/mob-pic-1-2.png" alt=""></li>
                    <li><img src="image/phone/mob-pic-1-3.png" alt=""></li>
                    <li><img src="image/phone/mob-pic-1-4.png" alt=""></li>
                    <li><img src="image/phone/mob-pic-1-5.png" alt=""></li>
                    <li><img src="image/phone/mob-pic-1-6.png" alt=""></li>
                </ul>
                <img src="image/phone/mob-pic-1-7.png" alt="">
            </div>
        </div>
        <!-- 资金存取，方便快捷 -->
        <div class="shortcut ">
            <div class="container shortcut_div">
                <el-row>
                    <el-col :span="12">
                        <div class="shortcut_left">
                            <div class="shortcut_phone_img"><img src="image/phone/mob-pic-2-9.png" alt=""></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="shortcut_right">
                            <img class="shortcut_title" src="image/phone/mob-pic-2-1.png" alt="">
                            <p>多渠道充值，快速到账！斩获大奖，随时提取！</p>
                            <img class="shortcut_text" src="image/phone/mob-pic-2-2.png" alt="">
                            <ul>
                                <li><img src="image/phone/mob-pic-2-3.png" alt=""></li>
                                <li><img src="image/phone/mob-pic-2-4.png" alt=""></li>
                                <li><img src="image/phone/mob-pic-2-5.png" alt=""></li>
                                <li><img src="image/phone/mob-pic-2-6.png" alt=""></li>
                                <li><img src="image/phone/mob-pic-2-7.png" alt=""></li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
        <!-- 活动好礼，抢先知晓 -->
        <div class="activity">
            <div class="container">
                <el-row>
                    <el-col :span="11">
                        <div class="shortcut_right">
                            <img class="shortcut_title" src="image/phone/mob-pic-3-1.png" alt="">
                            <p>优惠活动先知晓，不错过每一次精彩狂欢！</p>
                            <img class="shortcut_text" src="image/phone/mob-pic-3-2.png" alt="">
                            <ul>
                                <li><img src="image/phone/mob-pic-3-3.png" alt=""></li>
                                <li><img src="image/phone/mob-pic-3-4.png" alt=""></li>
                                <li class="li_3"><img src="image/phone/mob-pic-3-5.png" alt=""></li>
                                <li><img src="image/phone/mob-pic-3-6.png" alt=""></li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <div class="activity_img" :style="'background:url('+phoneList.phoneimg+') no-repeat 0px 0px;'">
                            <div><img src="image/phone/mob-pic-3-8.png" alt=""></div>

                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 二维码扫描区域 -->
        <div class="codeArea">

            <div class=" container code_img">
                <div class="codeArea_img_box">
                    <!-- <img src="webConfig/image/phone_2.png" alt> -->
                    <img :src="站点配置.appUrl" alt="" srcset="">
                </div>
                <div style="padding-left:60px;">
                    <div class="codeArea_img"><img src="image/phone/mob-pic-4-1.png" alt=""></div>
                    <p>{{config.title}}手机版</p>
                    <p>一样的游戏，不一样的感觉！</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    data() {
        return {
            config: config,
            phoneList: {
                phoneimg: config.img_url + 'image/phone/mob-pic-3-7.png'// 背景图
            }
        }
    },
    computed: {
        ...mapState({
            vuexConfig: 'config'
        }),
        ...mapGetters({
            站点配置: '站点配置'
        })
    },
    methods: {
        
    },
    created() {
        if (!this.站点配置.appUrl) {
            this.$router.push('/')
        }
        
    }
}
</script>

<style lang="scss" scoped>
// 公共样式开始
.shortcut_right {
    .shortcut_title {
        margin-top: 50px;
    }
    p {
        margin: 25px 0px 128px 0px;
        color: #ccc;
        font-size: 18px;
    }
    ul {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        .li_3 {
            img {
                width: 130%;
            }
        }
        li {
            width: 82px;
            height: 104px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.phone {
    .phone_baner {
        .bg_1{
            width: 100%;
        }
        font-size: 0px;
        // height: 780px;
        width: 100%;
        background-size: 100% 100%;
        position: relative;
        .phoneCodeDiv {
            background: #fff;
            position: absolute;
            top:  55%;
            left: 24%;
            // width: 190px;
            width: calc(100vw / 1920 * 190) ;
            min-width: 100px;
            padding-top: 10px;
            text-align: center;
            .img_box {
                padding: 0px 7px;
                height: 175px;
            }
            img {
                width: 100%;
                height: 100%;
            }
            p{
                padding: 7px 0px;
                font-size: 12px;
            }
        }
    }
    // 游戏丰富一应俱全
    .abundant {
        background: #fff;

        .abundant_div {
            height: 600px;
            text-align: center;
            p {
                line-height: 30px;
                margin-top: 30px;
                font-size: 18px;
                color: #ccc;
            }
            ul {
                display: flex;
                justify-content: space-around;
                width: 1200px;
                height: 143px;
                margin: 115px auto 14px auto;
                li {
                    width: 100px;
                    // height:143px;
                    height: 120px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    // 资金存取，方便快捷
    .shortcut {
        padding-top: 100px;
        height: 780;
        background: #e6ffff;
        .shortcut_div {
            .shortcut_left {
                background: url("~@/assets/image/mob-pic-2-8.png") no-repeat;
                position: relative;
                width: 240px;
                height: 600px;
                .shortcut_phone_img {
                    position: absolute;
                    top: 46px;
                    left: 112px;
                    width: 240px;
                    height: 600px;
                }
            }
        }
    }
    // 活动好礼，抢先知晓
    .activity {
        width: 100%;
        background: #fff;
        height: 640px;
        padding-top: 100px;

        .activity_img {
            // background: url("~@/assets/image/mob-pic-3-7.png") no-repeat;
            width: 700px;
            height: 700px;
            position: relative;
            margin-top: 100px;
            margin-left: 20px;

            img {
                position: absolute;
                top: -56px;
                left: 90px;
            }
        }
    }
    //  二维码扫描区域
    .codeArea {
        height: 480px;
        background: #e6ffff;
        .code_img {
            display: flex;
            text-align: center;
            .codeArea_img_box {
                width: 190px;
                height: 190px;
                margin: 0px 50px 0px 300px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .codeArea_img {
                margin-bottom: 25px;
            }
            p {
                color: #ccc;
                font-size: 18px;
            }
        }
    }
}
</style>
