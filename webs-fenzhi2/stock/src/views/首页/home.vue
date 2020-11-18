<template>
    <div class="index">
        <div class="title" v-if="!$route.meta.隐藏头部">
            <div class="kefu1" @click="go('/login')">登陆</div>
            <div class="log_box"><img src="https://bdpz.com/public/image/2019-06-05/331504f5-4d7e-4ca4-adaa-4955b2c62a60.png" alt=""></div>
            <div class="kefu2" @click="go('/register')">注册</div>
        </div>

        <div class="轮播">
            <!-- <el-carousel ref="carousel1" :width="'100%'" :height="'_vw(180)'" :interval="3000" arrow="always">
                <el-carousel-item v-for="(item, index) in banner" :key="index">
                    <div class="lb_box_img" @click="go轮播(item.Id)"><img :src="item" alt></div>
                </el-carousel-item>
            </el-carousel> -->
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in banner" :key="index">
                    <div class="lb_box_img" @click="go轮播(item.Id)"><img :src="item" alt></div>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="公告">
            <div class="left"><span class="iconfont icon-laba"></span></div>
            <div class="ul_content">
                <!-- <ul>
                    <li v-for="(item,index) in 公告">
                        <div class="li_title">{{item.title}}</div>
                    </li>
                </ul> -->
                <van-swipe :autoplay="3000" :vertical='true' :show-indicators="false" :touchable="false">
                    <van-swipe-item v-for="(item,index) in 公告" :key="index">
                        <div class="li_title">{{item.title}}</div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="right"><i class="el-icon-arrow-right"></i></div>
        </div>

        <div class="nav_a">
            <ul class="nav_a_ul">
                <li @click="go('/task')">
                    <div class="img_box"><img src="static/image/home/sy_1.png" alt=""></div>
                    <div class="text">新手任务</div>
                </li>
                <li @click="go('/helps')">
                    <div class="img_box"><img src="static/image/home/sy_2.png" alt=""></div>
                    <div class="text">帮助中心</div>
                </li>
                <li @click="go('/news')">
                    <div class="img_box"><img src="static/image/home/sy_3.png" alt=""></div>
                    <div class="text">行业资讯</div>
                </li>
                <li @click="go('/announcement')">
                    <div class="img_box"><img src="static/image/home/sy_4.png" alt=""></div>
                    <div class="text">最新公告</div>
                </li>
                <li @click="go('/APP')">
                    <div class="img_box"><img src="static/image/home/sy_5.png" alt=""></div>
                    <div class="text">APP下载</div>
                </li>
            </ul>
        </div>

        <div class="table_box">
            <ul class="title_ul">
                <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">按月配资 <div class="div_i" v-if="tableType==0"><img src="../../assets/img/queren.png" alt=""></i></div>
                </li>
                <li @click="clicktite(1)" :class="{'titleActive':tableType ==1}">按周配资 <div class="div_i" v-if="tableType==1"><img src="../../assets/img/queren.png" alt=""></i></div>
                </li>
                <li @click="clicktite(2)" :class="{'titleActive':tableType ==2}">按天配资 <div class="div_i" v-if="tableType==2"><img src="../../assets/img/queren.png" alt=""></i></div>
                </li>
                <li @click="clicktite(3)" :class="{'titleActive':tableType ==3}">免息配资 <div class="div_i" v-if="tableType==3"><img src="../../assets/img/queren.png" alt=""></i></div>
                </li>
            </ul>
            <ul class="ul_content">
                <li v-if="tableType==0" >
                    <div class="li_content">
                        <div class="li_content_min">
                            <div class="title_num_img"><img src="../../assets/img/推荐.png" alt=""></div>
                            <div class="title_num">
                                <h5>资金:<span class="fred">500</span>元起</h5>
                                <h5>倍数: 最高<span class="fred">10</span>倍</h5>
                            </div>
                            <p>极速开户，利率低至0.6%</p>
                            <p>最低 1 月起配，未申请终止操盘，延续自动延期</p>
                        </div>
                    </div>
                    <div class="li_btn"  @click="$router.push('/information')">立即申请</div>
                </li>
                <li v-if="tableType==1">
                    <div class="li_content">
                        <div class="li_content_min">
                            <div class="title_num_img"><img src="../../assets/img/推荐.png" alt=""></div>
                            <div class="title_num">
                                <h5>资金:<span class="fred">100</span>元起</h5>
                                <h5>倍数: 最高<span class="fred">6</span>倍</h5>
                            </div>
                            <p>极速开户，利率低至0.06%天</p>
                            <p>最低2天起配，未申请终止操盘，延续自动延期</p>
                        </div>
                    </div>
                    <div class="li_btn">立即申请</div>
                </li>
                <li v-if="tableType==2">
                    <div class="li_content">
                        <div class="li_content_min">
                            <div class="title_num_img"><img src="../../assets/img/推荐.png" alt=""></div>
                            <div class="title_num">
                                <h5>资金:<span class="fred">100</span>元起</h5>
                                <h5>倍数: 最高<span class="fred">10</span>倍</h5>
                            </div>
                            <p>极速开户，利率低至0%/天</p>
                            <p>免息天数长达20天</p>
                        </div>
                    </div>
                    <div class="li_btn">立即申请</div>
                </li>
                <li v-if="tableType==3">
                    <div class="li_content">
                        <div class="li_content_min">
                            <div class="title_num_img"><img src="../../assets/img/推荐.png" alt=""></div>
                            <div class="title_num">
                                <h5>资金:<span class="fred">500</span>元起</h5>
                                <h5>倍数: 最高<span class="fred">10</span>倍</h5>
                            </div>
                            <p>总共10000元配资资金，2个交易日。</p>
                            <p>盈利全归你，平台不收取任何费用。</p>
                        </div>
                    </div>
                    <div class="li_btn">立即申请</div>
                </li>
            </ul>
        </div>

        <div class="国内指数">
            <div class="title_zs">
                <span class="iconfont icon-ai-hot"></span><span>国内指数</span>
            </div>
            <div class="title_zs_title">
                <div class="div_title">上证指数</div>
                <div class="div_title">深证指数</div>
            </div>
            <div class="title_num">
                <div class="div_title">
                    <span class="fgreen"> {{shangzhen[1]}}</span><br>
                    <span class="fgreen"><span> {{shangzhen[2]}}</span>&nbsp;<span> {{shangzhen[3]}}<span>%</span></span></span>
                </div>
                <div class="div_title">
                    <span class="fred">{{shengzhen[1]}}</span><br>
                    <span class="fred"><span>{{shengzhen[2]}}</span>&nbsp;<span>{{shengzhen[3]}}<span>%</span></span></span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import {api_首页上证深证指数 } from "@/api/股票.js";

import $ from "jquery";
import { mapState } from "vuex";
export default {
    data() {
        return {
            shangzhen:[],
            shengzhen:[],
            banner:[
                'static/image/home/banner_1.jpg',
                'static/image/home/banner_2.jpg',
                'static/image/home/banner_3.jpg',
                'static/image/home/banner_4.jpg'
            ],
            tableType: 0,
            公告: [
                {
                    id: "0",
                    title: "上海霜害DJS",
                    date: "20197-7-12",
                    text: "上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS"
                },
                {
                    id: "1",
                    title: "上海霜害DJSHFKSA霜害DJSHFKSA",
                    date: "20197-7-12",
                    text: "上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS"
                },
                {
                    id: "2",
                    title: "上海霜害DJSHFKSA霜害DJSHFKSA",
                    date: "20197-7-12",
                    text: "上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS上海霜害DJSHFKSA霜害DJSHFKS"
                },

            ],
            // imgdata:[
            //     {
            //        Img:"../../assets/css/1-1.zip" ,
            //        Id:'1',
            //     },
            //      {
            //        Img:"../../assets/img/sy_xsrw@2x.png" ,
            //        Id:'1',
            //     },
            //      {
            //        Img:"../../assets/img/推荐.png" ,
            //        Id:'1',
            //     },
            //      {
            //        Img:"../../assets/css/1-1.zip" ,
            //        Id:'1',
            //     },
            // ]


        }
    },
    components: { // 注册组件

    },
    computed: {
        ...mapState({
            token:'token'
        })
    },
    created() {
        api_首页上证深证指数().then(x=>{
                var shang=x.data.data[0]
                var sheng=x.data.data[1]

                var shangdata=shang.split(',') 
                shangdata[1]=Number(shangdata[1]).toFixed(2)
                shangdata[2]=Number(shangdata[2]).toFixed(2)
                shangdata[3]=Number(shangdata[3]).toFixed(2)
                this.shangzhen=shangdata  

                var shengdata=sheng.split(',') 
                shengdata[1]=Number(shengdata[1]).toFixed(2)
                shengdata[2]=Number(shengdata[2]).toFixed(2)
                 shengdata[3]=Number(shengdata[3]).toFixed(2)
                 this.shengzhen=shengdata 
        }).catch(err=>{
            console.log(err)
        })
     
    },
    methods: {
        clicktite(index) {
            this.tableType = index
        },
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        }
    },
    mounted() {
        
    },
}


</script>

<style lang="scss" scoped>
.title {
        position: fixed;
        background: #ffffff;
        width: 100%;
        z-index: 10;
        top: 0px;
        left: 0px;
        z-index: 10;
        height: _vw(50);
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding: 0px _vw(8) 0px _vw(8);
        border-bottom: 1px solid #ccc;
        .kefu1,
        .kefu2 {
            position: absolute;
            top: 0px;
            line-height: _vw(50);
            text-align: center;
            color: red;
        }
        .kefu1{
            left: _vw(10);
        }
        .kefu2{
            right: _vw(10);
        }
        .log_box {
            margin-top: _vw(10);
            height: _vw(30);
            width: _vw(160);
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

.titleActive {
    color: red;
    background: #fff4ee !important;
}
p {
    margin: 0px;
}
.index {
    padding-bottom: _vw(50);
    background: #f3f3f4;
    padding-top: _vw(50);
    .轮播 {
        height: calc(100vw / 2);
        .lb_box_img{
            height: calc(100vw / 2);
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        // width: 100%;
    }
    .公告 {
        background: #ffffff;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        height: _vw(30);
        .ul_content {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-size: _vw(12);
            .li_title{
                line-height: _vw(30);
            }
            .van-swipe{
                height: 100%;
            }
        }
        .left,
        .right {
            flex-shrink: 0;
            width: _vw(30);
            line-height: _vw(30);
            font-size: _vw(24);
            text-align: center;
            .icon-laba {
                line-height: _vw(30);
                font-size: _vw(24);
                color: red;
            }
            .el-icon-arrow-right{
                color: #ccc;
                font-size: _vw(20)
            }
        }
    }

    .nav_a {
        padding: _vw(10) 0px _vw(10) 0px;
        background: #ffffff;
        .nav_a_ul {
            display: flex;
            justify-content: space-around;
            li {
                .img_box {
                    width: _vw(46);
                    height: _vw(46);
                    margin: 0px auto;
                    margin-bottom: _vw(10);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .text {
                    text-align: center;
                    font-size: _vw(12);
                }
            }
        }
    }

    .table_box {
        margin: _vw(5) 0px _vw(0) 0px;
        padding: _vw(10) _vw(15);
        // height: 300px;
        background: #ffffff;
        .title_ul {
            display: flex;
            justify-content: space-around;
            li {
                width: 22%;
                height: _vw(36);
                background: #f1f1f1;
                text-align: center;
                line-height: _vw(36);
                font-size: _vw(15);
                position: relative;
                .div_i {
                    width: _vw(20);
                    height: _vw(20);
                    position: absolute;
                    bottom: _vw(4);
                    right: _vw(-2);
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .ul_content {
            li {
                margin: _vw(10) 0px _vw(0) 0px;
                .li_content {
                    background: #fff4ee;
                    //   border-radius: _vw(4);
                    padding: 0px _vw(20) 0px _vw(20);
                    position: relative;
                    padding-bottom: _vw(16);
                    .li_content_min {
                        padding-top: _vw(34);
                        .title_num {
                            box-sizing: border-box;
                            display: flex;
                            justify-content: space-around;
                            border-bottom: 1px dashed #ccc;
                            padding-bottom: _vw(10);
                            margin-bottom: _vw(10);
                            h5 {
                                margin: 0px;
                            }
                            h5:nth-child(2) {
                                //  margin-right: _vw(20);
                            }
                            .fred {
                                font-size: _vw(18);
                                font-weight: _vw(500);
                            }
                        }
                        p {
                            font-size: _vw(14);
                            text-align: center;
                        }
                        .title_num_img {
                            position: absolute;
                            top: 0px;
                            right: 0px;
                            width: _vw(40);
                            height: _vw(40);
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                .li_btn {
                    width: 80%;
                    height: _vw(40);
                    text-align: center;
                    line-height: _vw(40);
                    color: #ffffff;
                    border-radius: _vw(4);
                    background: #ff4429;
                    margin: 0px auto;
                    margin-top: _vw(10);
                }
            }
        }
    }

    .国内指数 {
        // height: _vw(300);
        background: #ffffff;
        margin-top: _vw(10);
        .title_zs {
            display: flex;
            // border-bottom:1px solid #F1F1F1;
            height: _vw(40);
            border-bottom: 1px solid #f1f1f1;
            padding-left: _vw(10);
            span {
                line-height: _vw(40);
                margin-right: _vw(10);
            }
            .icon-ai-hot {
                color: red;
                font-size: _vw(22);
            }
            .div_title:nth-child(1) {
                border-right: 1px solid #f1f1f1;
            }
        }
        .title_zs_title {
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            .div_title:nth-child(1) {
                border-right: 1px solid #f1f1f1;
            }
            .div_title {
                width: 50%;
                text-align: center;
                line-height: _vw(40);
            }
        }
        .title_num {
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            .div_title:nth-child(1) {
                border-right: 1px solid #f1f1f1;
            }
            .div_title {
                padding: 10px 0px;
                width: 50%;
                text-align: center;
                //  line-height: _vw(40);
            }
        }
    }
}

// <script>
//   function noticeUp(obj,top,time) {
//     $(obj).animate({
//         marginTop: top
//     }, time, function () {
//         $(this).css({marginTop:"0"}).find(":first").appendTo(this);
//     })
// }
// </script>
// <script>
//     $(function () {
//         // 调用 公告滚动函数
//         setInterval("noticeUp('.notice ul','-35px',500)", 2000);
//     });
// </script>
</style>