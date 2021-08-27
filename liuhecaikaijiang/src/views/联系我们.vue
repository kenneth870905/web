<template>
    <div class="w1170">
        <div class="main">
            <div class="title">聯繫我們</div>
            <div class="article">澳門六合彩將竭誠為您提供最及時、最便捷、及滿意的服務。若有問題可透過以下方式與我們取得聯繫。</div>
            <ul class="contact">
                <li>
                    <img src="static/email.png" alt />
                </li>
                <li>
                    <!-- <span>email：momarksix@gmail.com</span> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.w1170 {
    width: 1170px;
    margin: 0px auto;
    min-height: calc(100% - 180px - 45px);
}
.main{
    margin: 0 auto;
    padding: 50px 180px;
    background-color: #fff;
    .title{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 24px;
        color: #2c2c2c;
    }
    li{
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        color: #2c2c2c;
        text-align: center;
        margin-bottom: 10px;
    }
    img{
        width: 48px;
        height: 48px;
    }
}
.article {
    color: #2c2c2c;
    width: 808px;
    height: 130px;
    padding-top: 10px;
    font-size: 15px;
    line-height: 30px;
}
</style>