<template>
    <div class="tb-foot">
        <div class="container w1200">
            <ul class="list_1">
                <!-- 共13个 -->
                <li v-for="(item, index) in 13" :key="index"></li>
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
            <div class="tb-foot-2">
                <div>新手帮助</div>
                <div>博彩责任</div>
                <div>隐私保护</div>
                <div>规则条款</div>
                <div>联系我们</div>
                <div>合营计划</div>
            </div>
            <div class="赞助">
                <a href="https://www.manutd.com/zh/partners/global/yabo%20sports" target="_blank"></a>
                <a href="http://www.legaseriea.it/en" target="_blank" ></a>
                <a href="http://www.fcbayern.cn/news/4098" target="_blank"></a>
                <a href="https://www.lcfc.com/news/1347075/leicester-city-name-yabo-sports-as-official-club-partner/press-release" target="_blank"></a>
                <a href="https://www.afa.com.ar/es/posts/afa-presenta-un-nuevo-sponsor-regional" target="_blank"></a>
                <a href="https://www.asmonaco.com/cn/yabo-sport-premier-regional-partner-de-las-monaco-en-asie/" target="_blank"></a>
                <a href="http://www.herthabsc.de/en/teams/yabo-sports/page/748--4-4-.html" target="_blank"></a>
            </div>
            <div class="banben">
                版权所有&nbsp;&nbsp;©2018-{{year}}{{config.title}}&nbsp;&nbsp;保留所有权
            </div>
        </div>
    </div>
</template>

<script>
// import $ from 'jquery'
export default {
    data() {
        return {
            config: config,
            year: new Date().getFullYear()
        }
    },
    methods: {
        go(url) {
            this.$router.push(url)
            // $('body,html').animate({ scrollTop: 0 }, 300)
        }
    }
}
</script>

<style lang="scss" scoped>
.tb-foot {
    background: #353f4b;
}
.container {
    padding: 29px 0 13px;
    color: #7c8797;
}
.list_1 {
    display: flex;
    height: 27px;
    margin-bottom: 22px;
    justify-content: space-between;
    align-items: center;
    li {
        // background-image: url("~@/assets/image/foot_m.png");
        background-image: url("~@/assets/image/footer1.png");
        background-repeat: no-repeat;
        background-size: auto 32px;
        cursor: pointer;
    }
    li:nth-child(1) {
        width: 124px;
        height: 32px;
        background-position: 0px 0px;
        &:hover {
            background-position: -126px 0;
        }
    }
    li:nth-child(2) {
        width: 83px;
        height: 32px;
        background-position: -252px 0;
        &:hover {
            background-position: -337px 0;
        }
    }
    li:nth-child(3) {
        width: 32px;
        height: 32px;
        background-position: -422px 0;
        &:hover {
            background-position: -456px 0;
        }
    }
    li:nth-child(4) {
        width: 32px;
        height: 32px;
        background-position: -490px 0;
        &:hover {
            background-position: -524px 0;
        }
    }
    li:nth-child(5) {
        width: 83px;
        height: 32px;
        background-position: -558px 0;
        &:hover {
            background-position: -643px 0;
        }
    }
    li:nth-child(6) {
        width: 94px;
        height: 32px;
        background-position: -728px 0;
        &:hover {
            background-position: -824px 0;
        }
    }
    li:nth-child(7) {
        width: 98px;
        height: 32px;
        background-position: -920px 0;
        &:hover {
            background-position: -1020px 0;
        }
    }
    li:nth-child(8) {
        width: 55px;
        height: 32px;
        background-position: -1120px 0;
        &:hover {
            background-position: -1177px 0;
        }
    }
    li:nth-child(9) {
        width: 88px;
        height: 32px;
        background-position: -1234px 0;
        &:hover {
            background-position: -1324px 0;
        }
    }
    li:nth-child(10) {
        width: 109px;
        height: 32px;
        background-position: -1414px 0;
        &:hover {
            background-position: -1525px 0;
        }
    }
    li:nth-child(11) {
        width: 25px;
        height: 32px;
        background-position: -1636px 0;
        &:hover {
            background-position: -1663px 0;
        }
    }
    li:nth-child(12) {
        width: 128px;
        height: 32px;
        background-position: -1690px 0;
        &:hover {
            background-position: -1820px 0;
        }
    }
    li:nth-child(13) {
        width: 71px;
        height: 32px;
        background-position: -1950px 0;
        &:hover {
            background-position: -2023px 0;
        }
    }
}
.text {
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    padding: 18px 0px 27px;
    border-top: 1px solid #404d5a;
}
.list_2 {
    text-align: center;
    font-size: 14px;
    padding: 0px 150px;
    margin: 0px 0px 30px;
    display: flex;
    justify-content: space-between;
    li {
        div {
            margin: 0px auto;
            background-image: url("~@/assets/image/foot_m.png");
            background-repeat: no-repeat;
            background-size: 189px 2718px;
        }
    }
    li:nth-child(1) {
        div {
            margin-bottom: 10px;
            width: 89px;
            height: 25px;
            background-position: -10px -447px;
        }
        &:hover {
            color: #ccc;
            div {
                background-position: -10px -402px;
            }
        }
    }
    li:nth-child(2) {
        div {
            margin-bottom: 8px;
            width: 154px;
            height: 30px;
            background-position: -10px -1296px;
        }
        &:hover {
            color: #ccc;
            div {
                background-position: -10px -1246px;
            }
        }
    }
    li:nth-child(3) {
        div {
            margin-bottom: 2px;
            width: 169px;
            height: 40px;
            background-position: -10px -2546px;
        }
        &:hover {
            color: #ccc;
            div {
                background-position: -10px -2486px;
            }
        }
    }
    li:nth-child(4) {
        div {
            margin-bottom: 3px;
            width: 41px;
            height: 41px;
            background-position: -10px -2667px;
        }
        &:hover {
            color: #ccc;
            div {
                background-position: -10px -2606px;
            }
        }
    }
}

.tb-foot-2 {
    margin: 0px 0px 16px;
    display: flex;
    justify-content: center;
    div {
        padding: 0 20px;
        font-size: 14px;
        color: #7c8797;
        cursor: pointer;
    }
    div:hover {
        color: #ccc;
    }
    div:not(:last-child) {
        border-right: 1px solid #7c8797;
    }
}

.赞助{
    margin: 0px 0px 16px;
    display: flex;
    justify-content: center;
    a{
        background-image: url('~@/assets/image/footer2.png');
        background-repeat: no-repeat;
        background-size: 4861px 41px;
        margin: 0px 15px;
    }
    a:nth-child(1){
        width: 110px;
        height: 40px;
        background-position: -2981px 0;
        &:hover{
            background-position: -3095px 0;
        }
    }
    a:nth-child(2){
        width: 144px;
        height: 40px;
        background-position:  -3209px 0;
        &:hover{
            background-position: -3357px 0;
        }
    }
    a:nth-child(3){
        width: 144px;
        height: 40px;
        background-position: -3505px 0;
        &:hover{
            background-position: -3653px 0;
        }
    }
    a:nth-child(4){
        width: 130px;
        height: 40px;
        background-position:  -3801px 0;
        &:hover{
            background-position:  -3935px 0;
        }
    }
    a:nth-child(5){
        width: 130px;
        height: 40px;
        background-position: -4069px 0;
        &:hover{
            background-position: -4203px 0;
        }
    }
    a:nth-child(6){
        width: 120px;
        height: 40px;
        background-position: -4337px 0;
        &:hover{
            background-position: -4461px 0;
        }
    }
    a:nth-child(7){
        width: 136px;
        height: 40px;
        background-position: -4585px 0;
        &:hover{
            background-position: -4725px 0;
        }
    }
}

.banben {
    text-align: center;
    font-size: 14px;
    color: #7c8797;
}
</style>

