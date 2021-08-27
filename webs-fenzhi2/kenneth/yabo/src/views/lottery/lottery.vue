<template>
    <div class="彩票">
        <div class="w1200">
            <ul class="list">
                <li :class="[{active:active==index},item.name]" v-for="(item, index) in list" :key="index">
                    <div class="L">
                        <img class="water" src="static/image/lottery/bg_water.png" >
                        <div class="img3List">
                            <img :src="`static/image/lottery/${item2}`" v-for="(item2, index2) in item.img3" :key="index2" >
                        </div>
                    </div>
                    <div class="R">
                        <div class="img1">
                            <img :src="`static/image/lottery/${item.img1}`" >
                        </div>
                        <div class="introduce">{{item.text}}</div>
                        <div class="img2">
                            <img :src="`static/image/lottery/${item2}`" v-for="(item2, index2) in item.img2" :key="index2" >
                        </div>
                        <div class="btn">进入游戏</div>
                    </div>
                </li>
            </ul>
            <ul class="btnList">
                <li :class="{active:active==index}" v-for="(item, index) in list" :key="index" @click="切换(index)">
                    <div class="logo">
                        <img :src="`static/image/lottery/${item.logo1}`" >
                        <img :src="`static/image/lottery/${item.logo2}`" >
                    </div>
                    <div>{{item.name}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            active:0,
            list:[
                {
                    logo1:"sy_logo1.png",
                    logo2:"sy_logo2.png",
                    name:"双赢彩票",
                    text:"专注于彩票游戏行业多年，拥有经典彩种、玩法。还有超多独家创新玩法，足够新颖，极易操作的游戏界面，更是在您游戏过程中增光添彩！",
                    img1:'sy1.png',
                    img2:['sy21.png','sy22.png','sy23.png','sy24.png','sy25.png'],
                    img3:['sy31.png','sy32.png','sy33.png','sy34.png']
                },{
                    logo1:"lb_logo1.png",
                    logo2:"lb_logo2.png",
                    name:"LB彩票",
                    text:"一支极其富有创造力的科技型队伍， 拥有丰富的游戏开发经验，敏锐的市场嗅觉以及时尚的设计理念，打造独创卡片式切换，让您永不下错期！",
                    img1:"lb1.png",
                    img2:['lb21.png','lb22.png','lb23.png','lb24.png','lb25.png'],
                    img3:['lb31.png','lb32.png','lb33.png']
                },{
                    logo1:"kg_logo1.png",
                    logo2:"kg_logo2.png",
                    name:"KG彩票",
                    text:"KG让娱乐游戏变得更精彩。为全球各色彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间。",
                    img1:'kg1.png',
                    img2:['kg21.png','kg22.png','kg23.png','kg24.png','kg25.png'],
                    img3:['kg31.png','kg32.png','kg33.png']
                },{
                    logo1:"bbin_logo1.png",
                    logo2:"bbin_logo2.png",
                    name:"BBIN彩票",
                    text:"BBIN彩票打造着高品质游戏体验、不断地求新求变，寻找最新的创意，秉持最好的服务……，种种这些都注定BBIN彩票的不俗传说，超百种彩票玩法任您赢！",
                    img1:"bbin1.png",
                    img2:['bbin21.png','bbin22.png','bbin23.png','bbin24.png','bbin25.png'],
                    img3:['bbin31.png','bbin32.png','bbin33.png']
                },{
                    logo1:"tcg_logo1.png",
                    logo2:"tcg_logo2.png",
                    name:"TCG彩票",
                    text:"TCG，业界首创区块链彩票，汲取区块链的核心技术算法，只为公平、公正的开奖结果。多地域的官方时时彩、11选5、PK10、PC蛋蛋和官方六合彩，足不出户却能无时无刻的尽情游玩！",
                    img1:"tcg1.png",
                    img2:['tcg21.png','tcg22.png','tcg23.png','tcg24.png','tcg25.png'],
                    img3:['tcg31.png','tcg32.png','tcg33.png']
                }
            ]   
        }
    },
    methods: {
        切换(index){
            this.active = index;
        }
    },
}
</script>

<style lang="scss" scoped>
@mixin btn() {
    background: linear-gradient(270deg, #489edb, #48cff7);
    color: #fff;
    border-radius: 25px;
    cursor: pointer;
    width: 182px;
    line-height: 50px;
    font-size: 18px;
    box-shadow: 0 8px 20px 10px rgba(25, 111, 200, 0.15),
        0 2px 6px 0 hsla(0, 0%, 100%, 0.5);
    border: none;
    text-align: center;
    &:hover {
        background: linear-gradient(90deg, #489edb, #48cff7);
    }
}
.彩票{
    background: #f4f6f9;
}

// 左边
@keyframes in {
     0% {
        -webkit-transform: rotateX(20deg);
        transform: rotateX(20deg);
        opacity: 0
    }

    to {
        -webkit-transform: rotateX(0);
        transform: rotateX(0);
        opacity: 1;
    }
}
// 背景 水
@keyframes in2 {
     0% {
        transform: scale(.9);
        opacity: 0
    }to {
        transform: scale(1);
        opacity: 1
    }
}
//右边
@keyframes in3 {
    0% {
        transform: translateX(100px);
        opacity: 0
    }50%{
        transform: translateX(100px);
        opacity: 0
    }to {
        transform: translateX(0);
        opacity: 1
    }
}
@keyframes out{
    0% {
        -webkit-transform: rotateX(0);
        transform: rotateX(0);
        opacity: 1
    }30% {
        -webkit-transform: rotateX(20deg);
        transform: rotateX(20deg);
        opacity: 1
    }to {
        -webkit-transform: rotateX(-80deg);
        transform: rotateX(-80deg);
        opacity: 0;
    }
}
@keyframes out2 {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1
    }to {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        opacity: 0
    }
}
@keyframes out3 {
     0% {
        transform: translateX(0);
        opacity: 1
    }to {
        transform: translateX(100px);
        opacity: 0
    }
}
@mixin zidingyi($name,$arr){
    @keyframes #{$name} {
        0% {
            transform: translate(0)
        }50% {
            // transform: translateY(-20px)
            transform: translate( nth($arr,1), nth($arr,2) );
        }to {
            transform: translate(0)
        }
    }
}
.list{
    height: 630px;
    position: relative;
    margin: 20px 0px 0px;
    li{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;  
        width: 100%;
        display: flex; 
        z-index: 1;
        pointer-events: none;
        &.active{
            pointer-events: auto;
            z-index: 0;
            .L{
                .img3List{
                    animation: in .8s ease forwards;
                }
                .water{
                    animation: in2 .8s forwards;
                }
            }
            .R{
                animation: in3 1.2s ease forwards;
            }
        }
    }
    
}
.L{
    perspective:1200px;
    width: 610px;
    position: relative;
    .img3List{
        position: relative;
        top: 0px;
        left: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
        animation: out .8s ease forwards;
        transform-origin:bottom center;
        transform-style:preserve-3d;
    }
    .water{
        animation: out2 .8s forwards;
        left: -68px;
        top: -30px;
        width: 712px;
    }
    img{
        position: absolute;
    }
}
.双赢彩票{
    .img3List{
        img:nth-child(1){
            width: 100%;
        }
        img:nth-child(2){
            top: 135px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
        img:nth-child(3){
            top: 28px;
            right: 54px;
            $name:unique-id();
            @include zidingyi($name,(0px,20px));
            animation: $name 5s ease infinite;
        }
        img:nth-child(4){
            top: 210px;
            right: -16px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
    }
}

.LB彩票{
    .img3List{
        img:nth-child(1){
            width: 100%;
        }
        img:nth-child(2){
            top: 116px;
            left: -30px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
        img:nth-child(3){
            top: 150px;
            right: 40px;
            $name:unique-id();
            @include zidingyi($name,(0px,20px));
            animation: $name 5s ease infinite;
        }
    }
}
.KG彩票{
    .img3List{
        img:nth-child(1){
            top: 40px;
        }
        img:nth-child(2){
            top: 80px;
            left: 48px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
        img:nth-child(3){
            top: 250px;
            right: 32px;
            $name:unique-id();
            @include zidingyi($name,(0px,20px));
            animation: $name 5s ease infinite;
        }
    }
}

.BBIN彩票{
    .img3List{
        img:nth-child(1){
            top: -60px;
            left: -88px;
        }
        img:nth-child(2){
            top: 236px;
            left: -10px;
            $name:unique-id();
            @include zidingyi($name,(0px,20px));
            animation: $name 5s ease infinite;
        }
        img:nth-child(3){
            top: 149px;
            right: -36px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
    }
}

.TCG彩票{
    .img3List{
        img:nth-child(1){
            top: -45px;
            left: -75px;
        }
        img:nth-child(2){
            top: 140px;
            left: 92px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
        img:nth-child(3){
            top: 364px;
            right: 4px;
            $name:unique-id();
            @include zidingyi($name,(0px,-20px));
            animation: $name 5s ease infinite;
        }
    }
}

.R{
    flex: 1;
    padding: 120px 0px 0px;
    animation: out3 .8s ease forwards;
    .img1{
        text-align: center;
    }
    .introduce{
        color: #666;
        line-height: 26px;
        margin: 40px auto 0px;
        width: 400px;
    }
    .img2{
        width: 450px;
        margin: 56px auto 0px;
        display: flex;
        justify-content: space-between;
    }
    .btn{
        @include btn;
        margin: 50px auto 0px;
    }
}

@mixin btnStyle (){
    color: #fff;
    background: linear-gradient(270deg,#3a97e5,#3eb7e7,#42d2e8);
    box-shadow: 0 4px 12px 6px rgba(0,180,255,.3);
    img:nth-child(1){
        display: none;
    }
    img:nth-child(2){
        display: block;
    }
}
.btnList{
    position: relative;
    z-index: 1;
    display: flex;
    padding: 0px 0px 74px;
    li{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 220px;
        height: 80px;
        border-radius: 10px;
        background: linear-gradient(270deg,hsla(0,0%,100%,.04),rgba(0,0,0,.04));
        box-shadow: 0 10px 10px 0 hsla(0,0%,74.9%,.3);
        text-align: center;
        color: #666;
        margin-right: 25px;
        font-size: 16px;
        cursor: pointer;
        &:hover{
            @include btnStyle;
        }
        &.active{
            @include btnStyle;
        }
        div{
            margin: 0px 3px;
        }
        img:nth-child(2){
            display: none;
        }
    }
}
</style>
