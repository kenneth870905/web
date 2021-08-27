<template>
    <div>
        <div class="真人" style="background-image:url('static/image/zhenren/bg.png')">
            <div class="w1200">
                <img class="bg1" :src="`static/image/zhenren/${当前.img1}`" alt="" srcset="">
                <div class="btnlist">
                    <div :class="{active:type==index}" @click="changeType(index)" v-for="(item, index) in list" :key="index">{{item.name}}</div>
                </div>
                <section :class="[item.name,{show:index==type}]" v-for="(item, index) in list" :key="index">
                    <article>
                        <img class="纱网" src="static/image/zhenren/bg_bodian.png" alt="" srcset="">
                        <div class="leftlist">
                            <img v-for="(item2, index2) in item.leftlist" :key="index2" :src="`static/image/zhenren/${item2}`">
                        </div>
                    </article>
                    <article class="R">
                        <img class="bg2" :src="`static/image/zhenren/${item.img2}`" alt="" srcset="">
                        <img class="bg3" :src="`static/image/zhenren/${item.img3}`" alt="" srcset="">
                        <div>
                            <button>立即游戏</button>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            type:0,
            list:[
                {
                    name:"AG真人",
                    img1:"ag1.png",
                    img2:"ag2.png",
                    img3:'ag3.png',
                    leftlist:['ag4.png','ag5.png','ag6.png','ag7.png','ag8.png']
                },
                {
                    name:"eBET真人",
                    img1:"ebet1.png",
                    img2:"ebet2.png",
                    img3:'ebet3.png',
                    leftlist:['ebet4.png','ebet5.png','ebet6.png','ebet7.png','ebet8.png','ebet9.png','ebet10.png','ebet11.png','ebet12.png']
                },
                {
                    name:"OG真人",
                    img1:"og1.png",
                    img2:"og2.png",
                    img3:'og3.png',
                    leftlist:['og4.png','og5.png','og6.png','og7.png','og8.png','og9.png']
                },
                {
                    name:"GD真人",
                    img1:"gd1.png",
                    img2:"gd2.png",
                    img3:'gd3.png',
                    leftlist:['gd4.png','gd5.png','gd6.png','gd7.png','gd8.png','gd9.png','gd10.png']
                },
                {
                    name:"BBIN真人",
                    img1:"bbin1.png",
                    img2:"bbin2.png",
                    img3:"bbin3.png",
                    leftlist:['bbin4.png','bbin5.png','bbin6.png','bbin7.png','bbin8.png','bbin9.png','bbin10.png','bbin11.png','bbin12.png','bbin13.png']
                }
            ]
        }
    },
    methods: {
        changeType(index){
            this.type=index;
        }
    },
    computed: {
        当前(){
            return this.list[this.type]
        }
    },
}
</script>

<style lang="scss" scoped>
.真人{
    position: relative;
    height: 782px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    overflow: hidden;
}
.w1200{
    position: relative;
    height: 100%;
}
.bg1{
    position: absolute;
    top: 65px;
    left: 0px;
}
.btnlist {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    padding: 60px 0px 0px;
    div {
        width: 120px;
        line-height: 42px;
        margin-left: 15px;
        border: none;
        border-radius: 6px;
        text-align: center;
        font-size: 16px;
        color: #666;
        cursor: pointer;
        background-image: linear-gradient(180deg,#fff,#e8e8e8);
        &.active {
            background: linear-gradient(180deg, #42d2e8, #3a98e5);
            box-shadow: 0 2px 20px 0 #3db0e6;
            color: #fff;
        }
        &:hover {
            background: linear-gradient(180deg, #42d2e8, #3a98e5);
            box-shadow: 0 2px 20px 0 #3db0e6;
            color: #fff;
        }
    }
}

@mixin btn() {
    display: inline-block;
    background: linear-gradient(270deg, #489edb, #48cff7);
    color: #fff;
    border-radius: 25px;
    cursor: pointer;
    width: 220px;
    line-height: 50px;
    font-size: 18px;
    box-shadow: 0 8px 20px 10px rgba(25, 111, 200, 0.15),
        0 2px 6px 0 hsla(0, 0%, 100%, 0.5);
    border: none;
    &:hover {
        background: linear-gradient(90deg, #489edb, #48cff7);
    }
}
@-webkit-keyframes left {
    0% {
        opacity: 0;
        transform: translate3d(-30px,0,0)
    }
    to {
        opacity: 1;
        transform: translateZ(0)
    }
}
@-webkit-keyframes right {
    0% {
        opacity: 0;
        transform: translate3d(30px,0,0)
    }
    to {
        opacity: 1;
        transform: translateZ(0)
    }
}
@keyframes out {
    0% {
        transform: translate( 0px ,0px );
        opacity: 1;
    }
    to {
        transform: translate(-30px,0px);
        opacity: 0;
    }
}
@keyframes out1 {
    0% {
        transform: translate( 0px ,0px );
        opacity: 1;
    }
    to {
        transform: translate(30px,0px);
        opacity: 0;
    }
}
@mixin 生成keyframes($name,$obj) {
	@keyframes #{$name} {
        0%{
            transform: translate( 0px ,0px );
            opacity: 0;
        }
        50% {
            transform: translate( map-get($obj, x) ,0px );
            opacity: 0;
        }
        to {
            transform: translate(0px,0px);
            opacity: 1;
        }
	}
}
section{
    position: absolute;
    width: 100%;
    height: 100%;
    // top: 102px;
    top: 0px;
    left: 0px;
    display: flex;
    flex: 1;
    // display: none;
    &.show{
        z-index: 1;
    //     display: flex;
    }
    article{
        width: 50%;
        position: relative;
    }
    article:nth-child(1){
        animation: out 0.8s forwards;
    }
    article:nth-child(2){
        animation: out1 0.8s forwards;
    }
}

.show{
    article:nth-child(1){
        @include 生成keyframes(AG真人1 , ( x:-30px ));
        animation: AG真人1 1.6s forwards;
        animation-fill-mode: forwards;
    }
    article:nth-child(2){
        @include 生成keyframes(AG真人2 , ( x:30px ));
        animation: AG真人2 1.6s forwards;
        animation-fill-mode: forwards;
    }
}

.R{
    text-align: center;
    padding: 160px 0px 0px;
    .bg2{
        margin: 0px auto 43px;
    }
    .bg3{
        margin: 0 auto 62px;
    }
    button{
        @include btn;
    }
}
.纱网{
    position: absolute;
    bottom: -180px;
    left: -350px;
}
.leftlist{
    img{
        position: absolute;
    }
}

@mixin 自定义keyframes($name,$arr){
    @keyframes #{$name} {
        0% {
            transform: translate(0px,0px);
        }
        50% {
            transform: translate( nth($arr,1) , nth($arr,2) );
        }
        to {
            transform: translate(0px,0px);
        }
    }
}
.AG真人{
    .leftlist{
        img:nth-child(1){
            bottom: -103px;
            left: 16px;
            z-index: 1;
        }
        img:nth-child(2){
            bottom: 41px;
            left: -97px;
        }
        img:nth-child(3){
            bottom: -46px;
            right: 100px;
        }
        img:nth-child(4){
            bottom: 390px;
            left: -82px;
            @include 自定义keyframes(ag4 , 0px 20px);
            animation: ag4 5s infinite;
        }
        img:nth-child(5){
            right: 163px;
            top: 140px;
            @include 自定义keyframes(ag5 , 0px -20px);
            animation: ag5 5s infinite;
        }
    }
}
.eBET真人{
    .leftlist{
        img:nth-child(1){
            bottom: 0px;
            left: 20px;
            z-index: 1;
        }
        img:nth-child(2){
            bottom: 0px;
            left: -85px;
        }
        img:nth-child(3){
            top: 250px;
            left: 60px;
            z-index: 1;
        }
        img:nth-child(4){
            top: 360px;
            right: 113px;
        }
        img:nth-child(5){
            right: 120px;
            bottom: 240px;
            @include 自定义keyframes(ebet5 , -10px 0px);
            animation: ebet5 5s infinite;
        }
        img:nth-child(6){
            bottom: 119px;
            right: 176px;
            @include 自定义keyframes(ebet6 , 10px 0px);
            animation: ebet6 5s infinite;
        }
        img:nth-child(7){
            bottom: 30px;
            left: 120px;
            z-index: 1;
            
            @include 自定义keyframes(ebet7 , 0px -10px);
            animation: ebet7 5s infinite;
        }
        img:nth-child(8){
            bottom: 154px;
            left: -67px;
            z-index: 1;
            @include 自定义keyframes(ebet8 , -10px 0px);
            animation: ebet8 5s infinite;
        }
        img:nth-child(9){
            bottom: 295px;
            left: -80px;
            @include 自定义keyframes(ebet9 , 10px 0px);
            animation: ebet9 5s infinite;
        }
    }
}
.OG真人{
    .leftlist{
        img:nth-child(1){
            left: 59px;
            bottom: 0px;
            z-index: 1;
        }
        img:nth-child(2){
            bottom: 345px;
            right: 180px;
            @include 自定义keyframes(OG真人2 , 0px -20px);
            animation: OG真人2 5s infinite;
        }
        img:nth-child(3){
            bottom: 5px;
            width: 245px;
            right: 95px;
        }
        img:nth-child(4){
            bottom: 15px;
            left: -70px;    
        }
        img:nth-child(5){
            bottom: 47px;
            left: -101px;
        }
        img:nth-child(6){
            bottom: 285px;
            left: -70px;
            @include 自定义keyframes(OG真人6 , 0px 20px);
            animation: OG真人6 5s infinite;
        }
    }
}
.GD真人{
    .leftlist{
        img:nth-child(1){
            left: 50px;
            bottom: 0px;
            z-index: 2;
        }
        img:nth-child(2){
            right: 200px;
            top: 405px;
            @include 自定义keyframes(GD真人1 , 0px 20px);
            animation: GD真人1 5s infinite;
        }
        img:nth-child(3){
            bottom: 100px;
            right: 87px;
        }
        img:nth-child(4){
            bottom: 43px;
            right: 88px;
        }
        img:nth-child(5){
            bottom: 15px;
            left: -100px;
            z-index: 1;
        }
        img:nth-child(6){
            bottom: 10px;
            left: -100px;
        }
        img:nth-child(7){
            top: 320px;
            left: -15px;
            @include 自定义keyframes(GD真人7 , 0px -20px);
            animation: GD真人7 5s infinite;
        }
    }
}

.BBIN真人{
    .leftlist{
        img:nth-child(1){
            left: -95px;
            bottom: 0px;
            z-index: 1;
        }
        img:nth-child(2){
            top: 140px;
            right: 250px;
            @include 自定义keyframes(BBIN2 , -10px 0px);
            animation: BBIN2 5s infinite;
        }
        img:nth-child(3){
            right: 85px;
            bottom: 84px;
        }
        img:nth-child(4){
            left: -254px;
            bottom: 160px;
            @include 自定义keyframes(BBIN4 , -10px 0px);
            animation: BBIN4 5s infinite;
        }
        img:nth-child(5){
            left: -171px;
            bottom: 42px;
        }
        img:nth-child(6){
            left: -149px;
            bottom: 173px;
            @include 自定义keyframes(BBIN6 , -10px 0px);
            animation: BBIN6 5s infinite;
        }
        img:nth-child(7){
            left: -233px;
            bottom: 219px;
            @include 自定义keyframes(BBIN7 , 10px 0px);
            animation: BBIN7 5s infinite;
        }
        img:nth-child(8){
            left: -253px;
            bottom: 301px;
            @include 自定义keyframes(BBIN8 , 0px -10px);
            animation: BBIN8 5s infinite;
        }
        img:nth-child(9){
            left: -236px;
            top: 272px;
            @include 自定义keyframes(BBIN9 , -10px 0px);
            animation: BBIN9 5s infinite;
        }
        img:nth-child(10){
            left: -176px;
            top: 250px;
            @include 自定义keyframes(BBIN10 , 10px 0px);
            animation: BBIN10 5s infinite;
        }
    }
}


</style>
