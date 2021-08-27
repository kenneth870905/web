<template>
    <div class="tb-foot fl">
        <div class="container">
            <ul class="list_1">
                <!-- 共13个 -->
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
            </ul>
            <div class="text">
                {{config.title}}拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（Gambling Commission）和菲律宾政府博彩委员会（PAGCOR）颁发的合法执照。
                <br />
                注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。进行注册并娱乐前，请确保您年满18周岁！
            </div>
            <ul class="list_2">
                <li>
                    <div></div>
                    <span>英国GC监督委员会</span>
                </li>
                <li>
                    <div></div>
                    <span>马耳他博彩牌照（MGA）认证</span>
                </li>
                <li>
                    <div></div>
                    <span>英属维尔京群岛（BVI）认证</span>
                </li>
                <li>
                    <div></div>
                    <span>菲律宾（PAGCOR）监督博彩牌照</span>
                </li>
            </ul>
            <ul class="tb-foot-2 fl">
                <li>
                    <a href="javascript:;" @click="go('/About')">关于{{config.title}}</a>
                    <span>|</span>
                    <a href="javascript:;" @click="go('/About')">博彩责任</a>
                    <span>|</span>
                    <a href="javascript:;" @click="go('/About')">规则与声明</a>
                    <span>|</span>
                    <a href="javascript:;" @click="go('/About')">常见问题</a>
                    <span>|</span>
                </li>
                <li class="banben">
                    <p>建议使用谷歌chrome浏览器、搜狗浏览器、360浏览器，给您的体验会更好哦！<br>
                        <!-- {{config.title}}<span>|</span>版权所有 -->
                        <font>版权所有</font><font>©2009-{{year}}{{config.title}}</font><font>保留所有权</font>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data() {
        return {
            config: config,
            year:new Date().getFullYear()
        }
    },
    methods: {
        go(url) {
            this.$router.push(url)
            $('body,html').animate({ scrollTop: 0 }, 300)
        }
    }
}
</script>

<style lang="scss" scoped>
.banben{
    font{
        margin: 0px 5px;
    }
}
.list_1{
    display: flex;
    height: 27px;
    margin-bottom: 22px;
    justify-content: space-between;
    align-items: center;
    li{
        background-image: url("~@/assets/image/foot_m.png");
        background-repeat:no-repeat;
        background-size:189px 2718px;
    }
    li:nth-child(1){
        width: 78px;
        height: 26px;
        background-position: -10px -492px;
        &:hover{
            background-position: -10px -538px;
        }
    }
    li:nth-child(2){
        width: 110px;
        height: 23px;
        background-position: -10px -228px;
        &:hover{
            background-position: -10px -271px;
        }
    }
    li:nth-child(3){
        width: 30px;
        height: 27px;
        background-position: -10px -866px;
        &:hover{
            background-position: -10px -913px;
        }
    }
    li:nth-child(4){
        width: 72px;
        height: 27px;
        background-position: -10px -584px;
        &:hover{
            background-position: -10px -631px;
        }
    }
    li:nth-child(5){
        width: 91px;
        height: 27px;
        background-position: -10px -1148px;
        &:hover{
            background-position: -9px -1197px;
        }
    }
    li:nth-child(6){
        width: 88px;
        height: 20px;
        background-position: -10px -148px;
        &:hover{
            background-position: -10px -188px;
        }
    }
    li:nth-child(7){
        width: 36px;
        height: 27px;
        background-position: -10px -960px;
        &:hover{
            background-position: -10px -1007px;
        }
    }
    li:nth-child(8){
        width: 73px;
        height: 27px;
        background-position: -10px -678px;
        &:hover{
            background-position: -10px -725px;
        }
    }
    li:nth-child(9){
        width: 126px;
        height: 19px;
        background-position: -10px -70px;
        &:hover{
            background-position: -10px -109px;
        }
    }
    li:nth-child(10){
        width: 28px;
        height: 27px;
        background-position: -10px -772px;
        &:hover{
            background-position: -10px -819px;
        }
    }
    li:nth-child(11){
        width: 28px;
        height: 27px;
        background-position: -10px -1054px;
        &:hover{
            background-position: -10px -1101px;
        }
    }
    li:nth-child(12){
        width: 101px;
        height: 24px;
        background-position: -10px -314px;
        &:hover{
            background-position: -10px -358px;
        }
    }
    li:nth-child(13){
        width: 101px;
        height: 10px;
        background-position: -10px -10px;
        &:hover{
            background-position: -10px -40px;
        }
    }
}
.text{
    text-align: center;
    font-size: 14px;
    line-height:18px;
    padding: 18px 0px 27px;
    border-top:1px solid #565656;
}
.container{
    padding: 29px 0 13px;
    color: #7c8797;
}
.list_2{
    text-align: center;
    font-size: 14px;
    padding: 0px 150px;
    display: flex;
    justify-content: space-between;
    li{
        div{
            margin: 0px auto;
            background-image: url("~@/assets/image/foot_m.png");
            background-repeat: no-repeat;
            background-size: 189px 2718px;
        }
    }
    li:nth-child(1){
        div{
            margin-bottom: 10px;
            width: 89px;
            height: 25px;
            background-position: -10px -447px;
        }
        &:hover{
            color: #ccc;
            div{
                background-position: -10px -402px;
            }
        }
    }
    li:nth-child(2){
        div{
            margin-bottom: 8px;
            width: 154px;
            height: 30px;
            background-position: -10px -1296px;
        }
        &:hover{
            color: #ccc;
            div{
                background-position: -10px -1246px;
            }
        }
    }
    li:nth-child(3){
        div{
            margin-bottom: 2px;
            width: 169px;
            height: 40px;
            background-position: -10px -2546px;
        }
        &:hover{
            color: #ccc;
            div{
                background-position: -10px -2486px;
            }
        }
    }
    li:nth-child(4){
        div{
            margin-bottom: 3px;
            width: 41px;
            height: 41px;
            background-position: -10px -2667px;
        }
        &:hover{
            color: #ccc;
            div{
                background-position: -10px -2606px;
            }
        }
    }
}

.tb-foot {
    width: 100%;
    background: #363636;
    .tb-foot-2 {
        width: 100%;
        padding: 10px 0px 0px;
        border-top: 1px solid #363636;
        li:nth-child(1){
            padding: 10px 0;
        }
        li:nth-child(2){
            padding: 10px 0 0px;
        }
        li {
            text-align: center;
            line-height: 28px;
            a {
                display: inline-block;
                padding: 0 6px;
                font-size: 13px;
                color: inherit;
                font-weight: 200;
            }
            a:hover {
                color: #ff3a2b;
                text-decoration: underline;
            }
            span {
                display: inline-block;
                margin: 0 30px;
            }
            p {
                font-size: 12px;
                font-weight: 600;
                span {
                    display: inline-block;
                    margin: 0 30px;
                }
            }
        }
    }
}

/*2017-08-08-底部样式-结束*/
</style>

