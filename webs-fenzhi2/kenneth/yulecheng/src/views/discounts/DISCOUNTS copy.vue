<template>
    <div class="discounts">
        <div class="discounts_banner">
            <div class="container">
                <div class="discounts_banner_box">
                    <img src="image/discounts/yh.jpg" alt="">
                </div>
                <ul>
                    <li v-for="(item, index) in 优惠列表" :key="index">
                        <div class="已结束" v-if="item.Stop">
                            <img src="image/discounts/hdjss.png" alt="">
                        </div>
                        <div class="discounts_show" @click="获取详情1(item)">
                            <div class="signin_img">
                                <img :src="item.Img" alt="">
                            </div>
                            <div class="signin_text">
                                <div>
                                    <h2>{{item.Name}}</h2>
                                    <p>{{item.Summary}}</p>
                                </div>
                                <div class="activity_content">
                                    <div class="particulars_time">
                                        <span class="el-icon-timer"></span>&nbsp;
                                        <span v-if="!item.EndTime">活动时间：长期有效</span>
                                        <span v-if="item.EndTime">活动时间：{{item.EndTime}} 止</span>
                                    </div>
                                    <div class="particulars_btn">
                                        <p>查看详情&nbsp;>></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <transition name="el-zoom-in-top">
                            <div v-show="item.show" class="transition-box-1" v-html="item.html"></div>
                        </transition>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import { api_获取优惠列表, api_获取优惠详情 } from '@/api/优惠接口.js'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            config: config,
            优惠列表: []
        }
    },
    methods: {
        ...mapActions({
            openloading: 'openloading'
        }),
        获取详情1(item) {
            if(item.Url){
                window.open(item.Url,'weinisi')
            }else if (item.html) {
                item.show = !item.show
                return
            }
            api_获取优惠详情(item.Id).then(x => {
                this.$set(item, 'html', x.data)
                this.$set(item, 'show', !item.show)
            }).catch(err => {
                this.$set(item, 'html', x.data)
            })
        }
    },
    mounted() {
        console.log('优惠活动')
        this.openloading(true)
        api_获取优惠列表({ home: false, type: 'bet' }).then(x => {
            this.优惠列表 = x.status == 200 ? x.data : []
            this.openloading(false)
        }).catch(err => {
            this.openloading(false)
        })
    }
}
</script>

<style lang="scss" scoped>
.discounts {
    background: #fff;
    width: 100%;
    // height:100%;

    .discounts_banner {
        //背景图
        // background: url("~@/assets/image/pro-bg03.jpg") no-repeat;
        background-image:url('~@/assets/image/pro-bg03.jpg'); 
        background-repeat: no-repeat;
        background-size: 100% auto;
        .discounts_banner_box {
            img {
                width: 100%;
            }
        }
        ul {
            li {
                position: relative;
                width: 100%;
                background: #fff;
                margin-top: 20px;
                margin-bottom: 20px;
                .已结束 {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    text-align: right;
                    padding: 30px 30px;
                    box-sizing: border-box;
                    img {
                        height: 100%;
                    }
                }
                .discounts_show:hover {
                    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
                }
                .discounts_show:hover .particulars_btn {
                    background: red;
                    color: #fff !important;
                }
                .discounts_show:hover .particulars_btn p {
                    color: #fff !important;
                }
                .discounts_show {
                    cursor: pointer;
                    //显示的框
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    display: flex;
                    height: 233px;
                    .signin_img {
                        flex-shrink: 0;
                        height: 100%;
                        width: 650px;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .signin_text {
                        width: 30%;
                        flex-grow: 1;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        h2 {
                            line-height: 60px;
                            font-size: 20px;
                            margin-left: 30px;
                            margin-top: 20px;
                        }
                        p {
                            font-size: 13px;
                            margin-left: 30px;
                        }
                        .activity_content {
                            width: 100%;
                            display: flex;
                            border-top: 1px solid #ccc;
                            height: 60px;
                            color: #ccc;
                            .particulars_time {
                                border-right: 1px solid #ccc;
                                width: 60%;
                                font-size: 16px;
                                padding-left: 30px;
                                span {
                                    line-height: 60px;
                                    color: #ccc;
                                }
                            }
                            .particulars_btn {
                                width: 40%;
                                p {
                                    margin: 20px 20px 20px 56px;
                                    color: red;
                                    color: 18px;
                                }
                            }
                        }
                    }
                }
                .transition-box-1 {
                    /deep/ p {
                        margin: 12px 0px;
                    }
                    padding: 20px;
                    border: 1px solid #e8e8e8;
                    /deep/ table {
                        border-spacing: 0px;
                        border: 1px solid #cccccc;
                        th,
                        td {
                            border-bottom: 1px solid #cccccc;
                            border-right: 1px solid #cccccc;
                            text-align: center;
                            height: 30px;
                        }
                    }
                }
            }
        }
    }
}
</style>
