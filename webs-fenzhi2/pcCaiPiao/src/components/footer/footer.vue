<template>
    <div class="footer">
        <div class="footer_top">
            <div class="container">
                <ul class="footer_ul">
                    <li v-if="站点配置.appUrl">
                        <div class="img_ewm"><img :src="站点配置.appUrl"></div>
                        <p>扫一扫 手机购彩更方便</p>

                    </li>
                    <li>
                        <ul class="son_ul">
                            <li class="son_li_title"><i class="iconfont icon-remen1"></i><span>平台优势</span></li>
                            <li class="son_li_title"><i class="iconfont icon-anquan"></i><span>账户安全</span></li>
                            <li class="son_li_title"><i class="iconfont icon-jiaoyi"></i><span>购彩简单</span></li>
                            <li class="son_li_title"><i class="iconfont icon-kuaisu"></i><span>领奖方便</span></li>
                            <li class="son_li_title"><i class="iconfont icon-bianjiekuaisu"></i><span>提款快速</span></li>
                        </ul>
                    </li>
                    <li>
                        <ul class="son_ul">
                            <li><i class="iconfont icon-zhanghu-copy"></i><span>账户相关</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('01')">如何注册账号</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('19')">怎么找回登陆密码</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('33')">如何修改手机号码</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('23')">如何修改真实姓名</span></li>
                        </ul>
                    </li>
                    <li>
                        <ul class="son_ul">
                            <li><i class="iconfont icon-chongzhi"></i><span>充值购彩</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('05')">如何进行充值</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('41')">如何购买彩票</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('08')">如何查询购彩记录</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('17')">在本站购彩安全吗</span></li>
                        </ul>
                    </li>
                    <li>
                        <ul class="son_ul">
                            <li class="son_li_a"><i class="iconfont icon-jiangbei"></i><span>兑奖体现</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('09')">怎样进行兑奖</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('11')">如何进行提款</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('12')">提款是否收手续费</span></li>
                            <li class="son_li_a"><span @click="helpCentergo('39')">提款不成功怎么办</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer_bottom">
            <div class="container">
                <ul>
                    <div class="img_footer_bottom"><img src="../../assets/images/bottom_1.png"></div>
                    <div class="img_footer_bottom"><img src="../../assets/images/bottom_2.png"></div>
                    <div class="img_footer_bottom"><img src="../../assets/images/bottom_3.png"></div>
                    <div class="img_footer_bottom"><img src="../../assets/images/bottom_4.png"></div>
                    <div class="img_footer_bottom"><img src="../../assets/images/bottom_5.png"></div>
                </ul>
                <p>2009-{{year}}©{{vuexconfig.title}}公司版权所有 </p>
                <p>{{vuexconfig.title}} 郑重提示：彩票有风险，投注需谨慎。不向未满18周岁的青少年出售彩票！</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters} from "vuex";
export default {
    data() {
        return {
            //  chuanqifalse:false,
            dataconfig: {
                api_urlData: config.api_url,//api_url
            },
            year:new Date().getFullYear()
        }
    },
    computed: {
        ...mapState({
            vuexconfig:"config",
             站点配置:'站点配置',

        }),
         ...mapGetters({
             站点配置:'站点配置',
        }),
    },
    methods: {
        helpCentergo(id) {//帮助中心
            this.$router.push("/helpCenter?id=" + id)
        },
        go(url) {
            this.$router.history.push(url);
        },
    },
   
}
</script>
<style lang="scss" scoped>
.footer {
    .footer_top {
        margin-top: 20px;
        width: 100%;
        height: 230px;
        background: url("../../assets/images/css_4.png") repeat;
        .footer_ul {
            li:nth-child(3),
            li:nth-child(4),
            li:nth-child(5) {
                li:nth-child(2),
                li:nth-child(3),
                li:nth-child(4),
                li:nth-child(5) {
                    cursor: pointer;
                    span:hover {
                        color: #ff9300;
                        text-decoration: underline;
                    }
                }
            }
        }
        .footer_ul {
            padding-top: 30px;
            display: flex;
            li:nth-child(1) {
                //    background: #ff9300;
                p {
                    font-size: 12px;
                }
            }
            li {
                padding-left: 30px;
                font-weight: 100;
                width: 20%;
                .img_titile {
                    width: 124px;
                    height: 28px;
                    margin-bottom: 26px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .img_ewm {
                    padding-top: 8px;
                    width: 120px;
                    height: 120px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .son_ul {
                    li:nth-child(1) {
                        font-size: 20px;
                        margin-bottom: 20px;

                        .iconfont {
                            color: #ccc;
                            font-size: 22px;
                            margin-right: 4px;
                        }
                    }
                    li:nth-child(2),
                    li:nth-child(3),
                    li:nth-child(4),
                    li:nth-child(5) {
                        .iconfont {
                            font-size: 18px;
                            color: #88888888;
                            margin-right: 4px;
                        }
                    }
                    .son_li_title {
                        font-size: 18px;
                    }

                    li {
                        font-size: 14px;
                        width: 100%;
                        span {
                            line-height: 28px;
                        }
                        .icon-chongzhi {
                            font-size: 26px !important;
                        }
                    }
                }
            }
        }
    }
    .footer_bottom {
        padding: 20px 0px;
        ul {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            .img_footer_bottom {
                width: 120px;
                height: 45px;
                margin: 0px 5px 0px 5px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        p {
            text-align: center;
            margin: 0px;
            font-size: 12px;
        }
    }
}
</style>


