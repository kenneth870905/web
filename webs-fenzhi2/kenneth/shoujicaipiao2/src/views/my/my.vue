<template>
    <div class="my">
        <div class="mui-content">

            <div class="头部2">
                <div class="bg">
                    <img :src="config.img_url+'static/image/bg_0.png'" alt="" srcset="">
                </div>
                <span class="主题">
                    <span @click="$router.push('/my/ztsz?back=1')">切换主题</span>
                </span>
                <div class="等级">账号:{{userinfo.UserId}}</div>
                <div class="账号" @tap="$router.push('/my/viplist')">
                    <span v-if="!等级.HasImg || !等级.MemberVipName">{{等级.MemberVipName ? 等级.MemberVipName : '普通会员'}}</span>
                    <img v-if="等级.HasImg" :src="config.api_url+'/App_Upload/Vip/'+等级.MemberVipName+'.png'" alt="">
                </div>
                <div class="头像" @click="$router.push('/my/basic')">
                    <img v-if="!Person.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="" srcset="">
                    <img v-if="Person.ImgId" :src="config.img_url+'static/image/touxiang/'+Person.ImgId" alt="" srcset="">
                </div>
                <div class="用户名" @click="$router.push('/my/basic')">
                    <span>
                        {{Person.Nickname ? Person.Nickname : '未设置'}}
                    </span>
                    <van-icon name="edit" />
                </div>
                <div class="金额">
                    <span class="符号">￥</span>
                    <span>{{新钱}}</span>
                    <!-- <span>0.00</span> -->
                </div>
                <!-- <div class="充值" >
                    <span class="线条"></span>
                    <i @click="$router.push('/my/chongzhi')" class="icon iconfont icon-chongzhi1"></i>
                    <div @click="$router.push('/my/chongzhi')">充值</div>
                </div>
                <div class="提现" @click="$router.push('/my/tixian')">
                    <i class="icon iconfont icon-tixian"></i>
                    <div>提现</div>
                </div> -->
            </div>

            <ul class="box_2">
                <router-link to="/my/tixian" tag="li">
                    <i class="icon iconfont icon-jilu"></i>
                    <span>提现</span>
                </router-link>
                <router-link to="/my/chongzhi" tag="li">
                    <i class="icon iconfont icon-chongzhijilu"></i>
                    <span>充值</span>
                </router-link>
                <router-link to="/edzh" tag="li">
                    <i class="icon iconfont icon-zhuanhuan"></i>
                    <span>额度转换</span>
                </router-link>
            </ul>

            <!-- 个人业务中间站 -->
            <div class="my_business">
                <ul>
                    <li @click="$router.push('/my/personage')">
                        <p>
                            <img :src="config.img_url+'static/image/my/bg_1.png'" alt="" srcset="">
                        </p>
                        <p>个人资料</p>
                    </li>
                    <li @click="$router.push('/orders')">
                        <p>
                            <img :src="config.img_url+'static/image/my/bg_2.png'" alt="" srcset="">
                        </p>
                        <p>投注记录</p>
                    </li>
                    <li @click="进入资金明细2('')">
                        <p><img :src="config.img_url+'static/image/my/bg_3.png'" alt="" srcset=""></p>
                        <p>资金明细</p>
                    </li>
                    <li @click="$router.push('/my/czjl')">
                        <p><img :src="config.img_url+'static/image/my/bg_4.png'" alt="" srcset=""></p>
                        <p>存取记录</p>
                    </li>
                    <!-- <li @click="进入资金明细('0')">
                        <p><img :src="config.img_url+'static/image/my/bg_5.png'" alt="" srcset=""></p>
                        <p>提现记录</p>
                    </li> -->

                    <!-- <li v-if="config.my && config.my.geRenBaoBiao" @click="$toast('暂未开放')">
                        <p><img :src="config.img_url+'static/image/my/bg_6.jpg'" alt="" srcset=""></p>
                        <p>个人报表</p>
                    </li> -->
                    <li @click="$router.push('/chatlist')">
                        <p>
                            <img :src="config.img_url+'static/image/my/tongxunlu.png'" alt="" srcset="" />
                        </p>
                        <p>通讯录</p>
                        <span class="未读" v-show="未读总条数>0">{{未读总条数>99 ? '99+' : 未读总条数}}</span>
                    </li>

                    <li v-if="config.my && config.my.yuEbao" @click="$router.push('/yeb/yeb')">
                        <p><img :src="config.img_url+'static/image/my/bg_3.png'" alt="" srcset=""></p>
                        <p>余额宝</p>
                    </li>
                    <li @click="$router.push('/agent')">
                        <p><img :src="config.img_url+'static/image/my/bg_7.png'" alt="" srcset=""></p>
                        <p>代理中心</p>
                    </li>
                    <li @click="$router.push('/noticeLead')">
                        <p><img :src="config.img_url+'static/image/my/bg_8.png'" class="公告图" alt="" srcset=""></p>
                        <p>信息公告</p>
                    </li>
                    <!-- <li @click="$router.push('/edzh')">
                        <p><img src="static/image/my/bg_9.png" alt="" srcset=""></p>
                        <p>额度转换</p>
                    </li> -->
                    <li @click="$router.push('/kefu')">
                        <p><img :src="config.img_url+'static/image/my/bg_13.png'" alt="" srcset=""></p>
                        <p>客服中心</p>
                    </li>
                    <!-- <li @click="$router.push('/shouchong')">
                        <p><img src="static/image/my/bg_9.png" alt="" srcset=""></p>
                        <p>每日首充</p>
                    </li> -->
                    <li v-if="config.my && config.my.heMai" @click="$router.push('/my/hm')">
                        <p><img :src="config.img_url+'static/image/my/bg_hhr.png'"></p>
                        <p>合买记录</p>
                    </li>
                    <li @click="$router.push('/my/plsz')">
                        <p>
                            <i class="icon iconfont icon-shezhi 设置"></i>
                        </p>
                        <p>系统设置</p>
                    </li>

                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { number_format } from "@/assets/js/通用.js";

export default {
    name:"",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            userinfo: x => x.user.userinfo,
            等级: x => x.user.等级,
            config: 'config',
            Person: x => x.个人资料.Person,
        }),
        ...mapGetters({
            试玩: 'user/试玩',
            未读总条数: '私聊/未读总条数'
        }),
        新钱() {
            if (!this.userinfo.Money) {
                return 0.00
            } else {
                return number_format(this.userinfo.Money)
            }
        }
    },
    methods: {
        ...mapActions({
            进入资金明细: "资金明细/进入资金明细",
            获取个人等级: 'user/获取个人等级',
            getPersonInfo: '个人资料/getPersonInfo'
        }),
        go(path) {
            if (this.试玩) {
                this.$toast('请登陆正式帐号')
            } else {
                this.$router.push(path)
            }
        },
        进入资金明细2(value){
            this.$router.push('/my/zhmx')
            this.进入资金明细(value)
        }
    },
    mounted() {
        this.获取个人等级();
        this.getPersonInfo();
        var number = 74478802.20;
        console.log(number_format(number))
    },
}
</script>
<style  lang="scss" scoped>
.mui-content {
    padding-bottom: _vw(40);
}

.头部2 {
    padding: 1px 0px _vw(35);
    position: relative;
    // @include bgcolor;
    @include jianbian;
    color: #ffffff;
    text-align: center;
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    * {
        position: relative;
        z-index: 1;
    }
    .主题,
    .等级 {
        position: absolute;
        top: 0px;
        color: #ffffff;
        font-size: 14px;
        line-height: 44px;
        z-index: 2;
        &.等级 {
            left: 10px;
            img {
                height: 20px;
            }
        }
        &.主题 {
            right: 10px;
        }
    }
    .账号 {
        margin: 50px 0px 0px;
        img {
            height: 20px;
        }
    }
    .头像 {
        width: _vw(70);
        height: _vw(70);
        // margin: 40px auto 0px;
        margin: 10px auto 0px;
        position: relative;
        z-index: 1;
        // box-shadow: 0px 0px 1px 1px #ffffff;
        border-radius: 100%;
        border: 2px solid rgba(255, 255, 255, 0.3);
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .用户名 {
        // font-size: 20px;
        font-size: 16px;
        margin: 5px 0px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 18px;
            color: #dcdcdc;
        }
    }
    .金额 {
        font-size: 13px;
        .符号 {
            font-size: 20px;
        }
    }
    .充值,
    .提现 {
        position: absolute;
        &.提现 {
            left: _vw(40);
            top: _vw(60);
        }
        &.充值 {
            right: _vw(40);
            top: 0px;
            .线条 {
                display: block;
                height: _vw(60);
                width: 1px;
                background: #ababab;
                margin: 0px auto;
            }
            transform-origin: top center;
            animation: huandong 3s infinite;
            // infinite是永久循环 linear 是线性变化 (step-end则是无线性变化，直接输出结果)
        }
        i {
            font-size: _vw(30);
        }
        div {
            font-size: _vw(12);
        }
    }
}

@keyframes huandong {
    0% {
        transform: rotate(10deg);
    }
    50% {
        transform: rotate(-10deg);
    }
    100% {
        transform: rotate(10deg);
    }
}

.box_2 {
    height: _vw(56);
    position: relative;
    z-index: 1;
    width: 90%;
    margin: _vw(-22) auto _vw(5);
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    // @include border-full(1px);
    // @include boxshow-full(4px,0px);
    &::after,
    &::before {
        position: absolute;
        height: 80%;
        width: 1px;
        content: "";
        top: 10%;
        background: #efeff4;
    }
    &::after {
        // left: 50%;
        left: 33.3%;
    }
    &::before {
        // left: 50%;
        left: 66.6%;
    }
    li {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: _vw(14);
        i {
            margin: 0px 5px 0px 0px;
            font-size: _vw(22);
            @include textcolor;
        }
    }
}

.my {
    background: #efeff4;
    padding: 0px 0px 30px;
    overflow: auto;
}
.充值提现 {
    height: _vw(20);
    position: relative;
    > ul {
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
        top: _vw(-20);
        border-radius: 5px;
        height: _vw(40);
        background: #ffffff;
        width: 90%;
        display: flex;
        text-align: center;
        align-items: center;
        font-size: _vw(14);
        > li {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 20px;
            margin: _vw(5);
        }
    }
}

//记录查询
.record {
    height: _vm(100);
    background: #ffffff;
    ul {
        display: flex;
        justify-content: space-between;
        li {
            border-top: none;
            border-bottom: none;
            padding-top: _vw(10);
            width: 25%;
            border: _vw(1) solid #eee;
            text-align: center;
            .iconfont {
                font-size: _vw(23);
            }
        }
        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3) {
            border-top: none;
            border-right: none;
            border-bottom: none;
        }
        li:nth-child(4) {
            border-top: none;
            border-bottom: none;
        }
    }
}
//业务展示
.my_business {
    // margin-top: -vw(10);
    ul {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        li {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #ffffff;
            width: calc(100% / 3);
            border-left: -vw(1) solid #eee;
            border-top: -vw(1) solid #eee;
            height: _vw(100);
            padding-top: -vw(10);
            i {
                font-size: -vw(30);
            }
            img {
                width: _vw(30);
            }
            .公告图 {
                width: _vw(35);
            }
            // /deep/ .con-kefu1 {
            //     font-size: -vw(44) !important;
            // }
        }
        li:nth-child(3n + 1) {
            border-left: none;
        }
    }
    .设置 {
        color: #656ef1;
    }
    .未读 {
        line-height: _vw(12);
        height: _vw(12);
        min-width: _vw(12);
        font-size: _vw(10);
        padding: 0px 2px;
        position: absolute;
        top: _vw(5);
        right: _vw(5);
        background: red;
        color: #ffffff;
        border-radius: _vw(12);
    }
}
</style>