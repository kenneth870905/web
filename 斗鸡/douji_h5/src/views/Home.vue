<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
            <img src="static/image/home-banner-1.jpg" alt="" srcset="">
        </van-swipe-item>
        <van-swipe-item>
            <img src="static/image/home-banner-2.jpg" alt="" srcset="">
        </van-swipe-item>
    </van-swipe>

    <van-notice-bar left-icon="volume-o" background="var(--color)" color="#fff" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />

    <van-row class="gameList" gutter="15">
        <van-col span="12"> <img src="static/image/home-game-1.jpg" alt=""></van-col>
        <van-col span="12"> <img src="static/image/home-game-2.jpg" alt=""></van-col>
    </van-row>

    <ul class="list">
        <li>
            <div><img src="static/image/home-1.png" alt=""></div>
            <div class="t1">REWARD SHOP</div>
            <div class="t2">
                COLLECT POINT AND
                <br>
                CLAIM YOUR REWARD
            </div>
        </li>
        <li>
            <div><img src="static/image/home-2.png" alt=""></div>
            <div class="t1">MEMBER VIP</div>
            <div class="t2">
                GROW UP WITH US AND
                <br>
                GET MORE WITH US
            </div>
        </li>
        <li>
            <div><img src="static/image/home-3.png" alt=""></div>
            <div class="t1">CLAW MINI GAME</div>
            <div class="t2">
                FUN PLAY AND
                <br>
                WIN WIN WIN WITH US
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    components: {
    }
}
</script>

<style lang="scss" scoped>
.my-swipe{
    img{
        width: 100%;
        display: block;
    }
}
.gameList{
    margin: 40px 15px 0px;
    img{
        border-radius: 15px;
        width: 100%;
        box-shadow: 0 0 10px 0px rgba($color: #000000, $alpha: 0.5);
    }
}

.list{
    background: #c8af96;
    text-align: center;
    margin: 30px 15px 30px;
    border-radius: 15px;
    padding: 50px 0px;
    img{
        height: 90px;
        margin: 15px 0px;
    }
    .t1{
        font-size: 24px;
        color: var(--color);
        font-weight: bold;   
    }
    .t2{
        font-size: 14px;
        color:#fff;
        margin: 15px 0px;
    }
}
</style>
