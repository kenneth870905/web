<template>
    <div id="index1">
        <!-- 轮播图 -->
        <el-carousel class="轮播图1" ref="carousel1" :interval="3000" arrow="always" trigger="click">
            <el-carousel-item v-for="(item , index) in 轮播图" :key="item.title">
                <img @click="跳转优惠活动(item)" :src="item.Img" alt>
            </el-carousel-item>
        </el-carousel>
        <!-- LED滚动开始-->
        <div class="container">
            <div class="tb-news">
                <div class="tb-news-bg"></div>
                <div class="tb-news-bt" id="Tb-News">
                    <div class="bn-title" :style="'background:url('+LEDimg+') no-repeat left center;'">系统公告</div>
                </div>
                <div class="easing notice_marquee" @click="readNotice()">
                    <marquee style="cursor: pointer;position: absolute;line-height: 36px; color:#fff; font-size: 13px;" direction="left" scrolldelay="80" scrollamount="5" behavior="scroll">
                        <span class="Tb-News-span" v-for="item in dataconfig.NoticeList" :key="item.id" data-time>{{item.text}}</span>
                    </marquee>
                </div>
            </div>
        </div>
        <!-- LED滚动 结束-->
        <!-- 业务展示开始 -->
        <div class="container">
            <ul class="ShowBusiness">
                <li class="discounts_box" v-for="(item, index) in dataconfig.indexGameList" :key="index">
                    <img class="particulars_img" :src="item.url" @click="clicktitle(item.roter)">
                    <div class="title">{{item.title}}</div>
                    <div class="btn_list">
                        <div class="点击进入" @click="clicktitle(item.roter)">点击进入</div>
                        <div v-if="item.rule" class="游戏规则" @click="clickRules()">游戏规则</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 业务展示结束 -->
        <!-- 优惠活动 -->
        <div class="container discounts">
            <div class="discounts_title">
                <i class="el-icon-present red"></i> &nbsp;
                <span>优惠活动</span>
            </div>
            <ul class="promotion">
                <li class="discounts_box" v-if="item.Img1" v-for="(item, index) in  优惠活动" :key="index">
                    <router-link to="/discounts" class="bg">
                        <img class="discounts_box_img" :src="item.Img1" />
                    </router-link>
                    <router-link to="/discounts" class="discounts_a">查看详情</router-link>
                </li>
            </ul>
        </div>

        <el-dialog class="通知公告" title="公告详情" width="680px" :visible.sync="显示滚动字幕">
            <ul>
                <li class="item" v-for="(item, index)  in NoticeList" :key="index">
                    <div class="title">
                        <p>{{item.Title}}</p>
                        <p>{{item.Createtime}}</p>
                    </div>
                    <div class="text">
                        <div @click="修改show2(item)">*{{item.show2 ? '关闭公告内容' : '点击查看公告内容'}}*</div>
                        <transition name="el-zoom-in-top">
                            <div v-show="item.show2" class="text_text" v-html="item.text"></div>
                        </transition>
                    </div>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
import { api_获取优惠列表 } from '@/api/优惠接口.js'
import { api_首页公告, api_首页公告详情 } from '@/api/公告接口.js'
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            text: '',
            NoticeList: [],
            显示滚动字幕: false,
            dynamicValidateForm: {
                domains: [{
                    value: ''
                }]
            },
            rules: { required: true, message: '域名不能为空', trigger: 'blur' },

            LEDimg: config.img_url + 'image/home/ntb-bg05.png', // LED背景图
            config: config,
            dataconfig: {
                indexGameList: homeConfig.game_list,
                NoticeList: config.roll_text
            },
            优惠活动: [],
            type: ""
        }
    },
    computed: {
        ...mapState({
            vuxCofig: 'config'
        }),
        轮播图() {
            if (typeof OnlineType == 'string' && OnlineType == 'tiyu') {
                return this.优惠活动
            } else if (this.vuxCofig.getConfig == 1) {
                var list = JSON.parse(JSON.stringify(this.优惠活动))
                list.splice(0, 1)
                return list
            } else if (this.vuxCofig.getConfig == 3) {
                return this.优惠活动
            }
            return []
        }
    },
    methods: {
        ...mapActions({
            openloading: 'openloading'
        }),
        tick() {
            var date = new Date();
            this.year = date.getFullYear();
            var monthnum = date.getMonth() + 1;
            this.month = monthnum < 10 ? "0" + monthnum : monthnum;
            this.date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var currentTime = this.year + "-" + this.month + "-" + this.date + "  " + this.hour + ":" + this.minute + ":" + this.second;
            return currentTime;
        },
        跳转优惠活动(item) {
            if (!item.Url) {
                this.$router.push('/discounts')
            } else {
                window.open(item.Url, 'weinisi')
            }
        },
        // 点击业务展示的模块跳转的对应路由
        clicktitle(title) {
            this.$router.history.push(title)
        },
        clickRules() {
            this.$router.history.push('/LotteryRules')
        },
        修改show2(item) {
            this.$set(item, 'show2', !item.show2)
            if (!item.text) {
                api_首页公告详情({ id: item.Id }).then(x => {
                    // this.text = x.data
                    this.$set(item, 'text', x.data)
                }).catch(err => { })
            }
        },
        // 弹出框 显示公告列表
        readNotice() { // loading的调用： 1.请求发送前调用为true 2.发送请求后调用(false)  3.抛出错误false
            this.openloading(true)
            api_首页公告().then(x => { // 点击led公告显示弹窗 发送请求公告内容
                this.NoticeList = x.status == 200 ? x.data : []
                this.显示滚动字幕 = true
                this.openloading(false)
            }).catch(err => {
                this.openloading(false)
            })
        }
    },
    mounted() {
        var type = 'bet';
        // 主要区分体育和bet
        if (typeof OnlineType == 'string') {
            type = OnlineType
        }
        api_获取优惠列表({ 'home': true, type: type }).then(x => {
            this.优惠活动 = x.status == 200 ? x.data : []
        }).catch(err => {
            console.log(err)
        })
    },
    watch: {
        // vuxCofig:{
        //     immediate: true,
        //     handler(){
        //         // console.log(this.vuxCofig)
        //         setTimeout(()=>{
        //             //修改轮播图片
        //             if(this.vuxCofig.getConfig==3){
        //                 this.$refs.carousel1.prev();
        //             }
        //         },500)
        //     }
        // }
    }

}
</script>
<style lang="scss" scoped>
.轮播图1 {
    height: calc(100vw * (460 / 1920));
    /deep/ .el-carousel__container {
        height: 100%;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    /deep/ .el-carousel__button {
        width: 12px;
        height: 12px;
        border-radius: 100%;
        border: 2px solid #000;
    }
    /deep/ .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;

        margin: 0;
    }
    /deep/ .el-carousel__indicators--horizontal {
        bottom: 30px;
    }
    /deep/ .el-carousel__arrow {
        background-color: rgba(146, 146, 146, 0.48);
    }
    /deep/ .el-carousel__arrow--right {
        right: 80px;
    }
}
#index1 {
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409eff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }

    // 业务展示模块
    .ShowBusiness {
        margin-top: 20px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 200px;
        li {
            width: 19%;
            height: 200px;
            position: relative;
            border-radius: 5px;
            overflow: hidden;
            .particulars_img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .title {
                position: absolute;
                left: 0px;
                bottom: 0px;
                // bottom: -32px;
                width: 100%;
                background: rgba(0, 0, 0, 0.5);
                text-align: center;
                color: #fff;
                height: 32px;
                line-height: 32px;
                font-size: 13px;
                transition: all 0.5s;
            }
            .btn_list {
                position: absolute;
                left: 0px;
                bottom: -32px;
                width: 100%;
                text-align: center;
                color: #fff;
                font-size: 13px;
                transition: all 0.5s;
                display: flex;
                align-items: flex-end;
                transition: all 0.5s;
                div {
                    flex-grow: 1;
                    transition: all 0.1s;
                    height: 32px;
                    line-height: 32px;
                }
                .点击进入 {
                    background: rgba(2, 21, 76, 0.6);
                    cursor: pointer;
                }
                .点击进入:hover {
                    background: rgba(2, 21, 76, 0.9);
                    line-height: 36px;
                    height: 36px;
                }
                .游戏规则 {
                    background: rgba(255, 0, 0, 0.6);
                    cursor: pointer;
                }
                .游戏规则:hover {
                    line-height: 36px;
                    height: 36px;
                    background: rgba(255, 0, 0, 0.9);
                }
            }
        }
        li:hover {
            .title {
                bottom: -32px;
            }
            .btn_list {
                bottom: 0px;
            }
        }
    }
    //  业务展示模块结束

    /* 优惠活动 */
    .discounts {
        .discounts_title {
            margin: 10px 0px 10px 5px;
            font-size: 24px;
            font-weight: 1000;
        }
        .promotion {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li:hover {
                .discounts_a {
                    display: block;
                    height: 34px;
                }
                .discounts_box_img {
                    filter: blur(1px);
                }
            }
            li {
                position: relative;
                margin-bottom: 28px;
                // width: 31.5%;
                width: 388px;
                height: 200px;
                background: #d6d6d6;
                .bg {
                    font-size: 0px;
                    display: block;
                    height: 100%;
                    overflow: hidden;
                }
                .discounts_a {
                    height: 0px;
                    overflow: hidden;
                    background: rgba(0, 0, 0, 0.6);
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    width: 100%;
                    text-align: center;
                    line-height: 34px;
                    color: #fff;
                    font-size: 14px;
                    // display: none;
                    transition: all 0.3s;
                }
                .discounts_box_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    /* 优惠活动 结束*/

    .通知公告 {
        display: flex;
        align-items: center;
        justify-content: center;
        /deep/ .el-dialog__header {
            position: sticky;
            top: 0px;
            background: red;
            // color: #fff;
            padding-top: 10px;
            .el-dialog__title {
                color: #fff;
            }
            .el-dialog__headerbtn .el-dialog__close {
                color: #fff;
                font-size: 18px;
            }
        }
        .el-dialog {
            margin: 20px;
            margin-top: 20px !important;
        }
        /deep/ .el-dialog__body {
            min-height: 350px;
            overflow: auto;
            background-color: #f5f5f5;
        }
        .item {
            margin-bottom: 20px;
            padding: 10px 0px;
            background: #ffffff;
            // border-radius: 4px;
            border: 1px solid #ccc;
            display: flex;
            flex-wrap: wrap;
            .title {
                width: 100%;
                height: 46px;
                color: red;
                font-size: 15px;
                border-bottom: 1px solid #ccc;
                p {
                    padding-left: 20px;
                }
            }
            .text {
                width: 100%;
                height: 100%;
                div {
                    padding-left: 20px;
                }
                div:nth-child(1) {
                    color: green;
                    font-size: 16px;
                    width: 100%;
                    height: 46px;
                    line-height: 50px;
                }
                .text_text {
                    //  color:hotpink;
                    height: 400px;
                    height: 100%;
                }
            }
        }
    }
}
</style>
