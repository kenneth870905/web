<template>
    <div class="lotteryAll">
        <ul>
            <li class="show_li">
                <div class="show_li_top">
                    <div class="top">
                        <div class="img_box"><img :src="config.api_url+'/Areas/Lottery/Content/img/10000.png'" alt=""></div>
                        <div class="top_centent">
                            <h4>分分时时彩</h4>
                            <p>第 201906261053 期</p>
                        </div>
                        <div class="date_box">00:01:56</div>
                    </div>
                    <div class="centent">
                        <div>上期开奖</div>
                        <div>
                            <ul>
                                <li>2</li>
                                <li>09</li>
                                <li>11</li>
                                <li>6</li>
                                <li>1</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div @click="go('/notice')" class="goBtn">
                        <div><span class="iconfont icon-bhjaward"></span><span>开奖记录</span></div>
                    </div>
                    <div>
                        <div @click="go('/playRule')" class="goBtn"><span class="iconfont icon-jilu"></span><span>玩法规则</span></div>
                    </div>
                    <div class="bet_btn">立即投注</div>
                </div>
            </li>

            <li class="hidden_li"></li>
            <li class="hidden_li"></li>
            <li class="hidden_li"></li>
            <li class="hidden_li"></li>

        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            config:'config'
        })
    },
    methods: {
        go(url) {
            this.$router.history.push(url);
        }
    },
    mounted() {

    }

}
</script>
  <style lang="scss" scoped>
.lotteryAll {
    padding: 10px 10px 10px 10px;
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .show_li:hover {
            box-shadow: 5px 5px 5px #e7e7e7;
            transform: scale(1.1);
            //  transition: scle(1.3);

            // transition:all 0.1s;
        }
        .show_li {
            width: 316px;
            margin: 10px;
            background: #fff;
            box-sizing: border-box;
            border: 2px solid #e7e7e7;
            transition: all 0.2s;
            .show_li_top {
                padding: 10px;
                padding-bottom: none;
                height: 118px;
                .top {
                    padding-top: 6px;
                    display: flex;
                    .top_centent {
                        padding-left: 16px;
                        p {
                            margin: 0px;
                            font-size: 14px;
                        }
                        h4 {
                            margin: 0px;
                            margin-bottom: 14px;
                        }
                    }
                    .date_box {
                        padding-top: 36px;
                        font-size: 14px;
                        padding-left: 18px;
                    }
                    .img_box {
                        width: 57px;
                        height: 57px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .centent {
                    display: flex;
                    padding-top: 20px;
                    div:nth-child(1) {
                        margin-right: 20px;
                        font-size: 14px;
                        text-align: center;
                    }
                    ul {
                        display: flex;
                        li {
                            text-align: center;
                            margin-right: 6px;
                            width: 24px;
                            height: 24px;
                            color: #ffffff;
                            background: red;
                            border-radius: 50%;
                            line-height: 24px;
                        }
                    }
                }
            }
            .bottom {
                display: flex;
                border-top: 1px solid #e7e7e7;
                height: 40px;
                height: 39px;
                .bet_btn {
                    width: 104px;
                    height: 39px;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 39px;

                    background: red;
                    color: #ffffff;
                }
                .goBtn {
                    line-height: 39px;
                    height: 39px;
                    border-right: 1px solid #e7e7e7;
                    width: 104px;
                    display: flex;
                    box-sizing: border-box;
                    padding-left: 10px;
                    background-color: #f7f7f7;
                    .icon-bhjaward {
                        color: red;
                        font-size: 18px;
                        padding-right: 4px;
                    }
                    .icon-jilu {
                        font-size: 18px;
                        color: rgb(80, 194, 65);
                        padding-right: 4px;
                    }
                }
            }
        }
        .hidden_li {
            width: 316px;
            height: 0px;
            margin: 10px;
            background: rgb(54, 17, 97);
        }
    }
}
</style>
  