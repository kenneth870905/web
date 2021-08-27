<template>
    <div>
        <div class="jingji" style="background-image:url('static/image/jinji/im_sport_bg.jpg')">
            <div class="content">
                <div class="btnlist">
                    <div :class="{active:type==0}" @click="type=0">IM电竞</div>
                    <div :class="{active:type==1}" @click="type=1">泛亚电竞</div>
                </div>
                <div class="内容" :class="{active:type==0}">
                    <div class="img_list">
                        <img :src="`static/image/jinji/${item}`" v-for="(item, index) in picture.img_list" :key="index" alt="" srcset="">
                    </div>
                    <div class="bottom" style="background-image:url('static/image/jinji/im_map.png')">
                        <div class="圆点">
                            <img :src="`static/image/jinji/${picture.圆点1}`" v-for="(item, index) in 5" :key="index" alt="" srcset="">
                        </div>
                        <div class="圆点1">
                            <img :src="`static/image/jinji/${picture.圆点2}`" v-for="(item, index) in 5" :key="index" alt="" srcset="">
                        </div>
                        <div class="bg1">
                            <img :src="`static/image/jinji/${picture.bg1}`" alt="">
                        </div>
                        <div class="bg2">
                            <img :src="`static/image/jinji/${picture.bg2[0]}`" alt="" srcset="">
                            <img class="textbg" :src="`static/image/jinji/${picture.bg2[1]}`" alt="" srcset="">
                            <div class="btn" :style="{'background-image':`url('static/image/jinji/${picture.bg2[2]}')`}">立即游戏</div>
                            <img class="textbg" :src="`static/image/jinji/${picture.bg2[3]}`" alt="" srcset="">
                            <img :src="`static/image/jinji/${picture.bg2[4]}`" alt="" srcset="">
                        </div>
                        <div class="bg3">
                            <img src="static/image/jinji/im-icon.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            type: 0,
            list: [
                { 
                    img_list: ['im_img_1.png', 'im_img_2.png', 'im_img_3.png', 'im_img_4.png', 'im_img_5.png'] ,
                    圆点1:"red_img.png",
                    圆点2:"blue_img.png",
                    bg1:"im-title.png",
                    bg2:['im-icon-left.png','im-tip2.png','orange_button.png','im-tip1.png','im-icon-right.png']
                },
                { 
                    img_list: ['avia_img_1.png', 'avia_img_2.png', 'avia_img_3.png', 'avia_img_4.png', 'avia_img_5.png'] ,
                    圆点1:"blue_img.png",
                    圆点2:"red_img.png",
                    bg1:"fanya-title.png",
                    bg2:['fanya-icon-left.png','fanya-tip2.png','blue_button.png','fanya-tip1.png','fanya-icon-right.png']
                }
            ]
        }
    },
    computed: {
        picture(){
            return this.list[this.type]
        }
    },
}
</script>

<style lang="scss" scoped>
.jingji {
    // height: 790px;
    overflow: hidden;
    background-size: cover;
}
.content {
    width: 1730px;
    margin: 0px auto;
    position: relative;
    height: 100%;
}
.内容 {
    padding: 1px 0px 0px;
}
.btnlist {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 75px 0px 0px;
    div {
        text-align: center;
        width: 176px;
        box-shadow: 0 2px 20px 0 #c5c5c5;
        background-image: linear-gradient(180deg, #fff, #e6e7e8);
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        line-height: 50px;
        color: #777;
        margin: 0px 25px;
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

// 人物动画
@mixin 生成keyframes($name, $obj) {
    @keyframes #{$name} {
        0% {
            transform: translate(map-get($obj, x), map-get($obj, y));
        }
        0% {
            transform: translate(map-get($obj, x), map-get($obj, y));
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
}
@keyframes biaoti1 {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes biaoti2 {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes 圆点动画1 {
    0% {
        opacity: 0;
        transform: translate3d(0, 50%, 0) scale(0.6);
    }
    to {
        opacity: 1;
        transform: translateZ(0) scale(1);
    }
}
@keyframes 圆点动画2 {
    0% {
        opacity: 0;
        transform: translate3d(0, 50%, 0) scale(0.6);
    }
    to {
        opacity: 1;
        transform: translateZ(0) scale(1);
    }
}

.active {
    .img_list {
        img:nth-child(1) {
            @include 生成keyframes(
                a1,
                (
                    x: 0px,
                    y: 50px
                )
            );
            animation: a1 1.2s ease-in-out;
        }
        img:nth-child(2) {
            @include 生成keyframes(
                a2,
                (
                    x: 0px,
                    y: 20px
                )
            );
            animation: a2 1.2s ease-in-out;
        }
        img:nth-child(3) {
            @include 生成keyframes(
                a3,
                (
                    x: 0px,
                    y: -30px
                )
            );
            animation: a3 1.2s ease-in-out;
        }
        img:nth-child(4) {
            @include 生成keyframes(
                a4,
                (
                    x: 0px,
                    y: 20px
                )
            );
            animation: a4 1.2s ease-in-out;
        }
        img:nth-child(5) {
            @include 生成keyframes(
                a5,
                (
                    x: 0px,
                    y: 50px
                )
            );
            animation: a5 1.2s ease-in-out;
        }
    }
    .bottom {
        .bg1 {
            animation: biaoti1 1.2s ease-in-out 0.2s both;
        }
        .圆点 {
            img {
                animation: 圆点动画2 0.6s ease-in-out both;
            }
        }
        .圆点1 {
            img {
                animation: 圆点动画2 0.6s ease-in-out both;
            }
        }
    }
}
.img_list {
    position: relative;
    img {
        position: absolute;
        width: 305px;
    }
    img:nth-child(1) {
        left: 250px;
        top: -35px;
        @include 生成keyframes(
            a11,
            (
                x: 0px,
                y: 50px
            )
        );
        animation: a11 1.2s ease-in-out;
    }
    img:nth-child(2) {
        left: 484px;
        top: 15px;
        @include 生成keyframes(
            a21,
            (
                x: 0px,
                y: 20px
            )
        );
        animation: a21 1.2s ease-in-out;
    }
    img:nth-child(3) {
        left: 0px;
        right: 0px;
        margin: auto;
        top: 66px;
        @include 生成keyframes(
            a31,
            (
                x: 0px,
                y: -30px
            )
        );
        animation: a31 1.2s ease-in-out;
    }
    img:nth-child(4) {
        right: 480px;
        top: 23px;
        @include 生成keyframes(
            a41,
            (
                x: 0px,
                y: 20px
            )
        );
        animation: a41 1.2s ease-in-out;
    }
    img:nth-child(5) {
        right: 234px;
        top: -31px;
        @include 生成keyframes(
            a51,
            (
                x: 0px,
                y: 50px
            )
        );
        animation: a51 1.2s ease-in-out;
    }
}

.bottom {
    position: relative;
    margin: 280px 0px 0px;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center bottom;
    .圆点 {
        img {
            position: absolute;
            animation: 圆点动画1 0.6s ease-in-out both;
        }
        img:nth-child(1) {
            left: 270px;
            bottom: 50px;
        }
        img:nth-child(2) {
            left: 330px;
            bottom: 75px;
        }
        img:nth-child(3) {
            left: 390px;
            bottom: 95px;
        }
        img:nth-child(4) {
            left: 460px;
            bottom: 115px;
        }
        img:nth-child(5) {
            left: 500px;
            bottom: 165px;
        }
    }
    .圆点1 {
        img {
            position: absolute;
            animation: 圆点动画1 0.6s ease-in-out both;
        }
        img:nth-child(1) {
            right: 390px;
            bottom: 65px;
        }
        img:nth-child(2) {
            right: 310px;
            bottom: 90px;
        }
        img:nth-child(3) {
            right: 460px;
            bottom: 130px;
        }
        img:nth-child(4) {
            right: 370px;
            bottom: 135px;
        }
        img:nth-child(5) {
            right: 450px;
            bottom: 170px;
        }
    }
    .bg1 {
        text-align: center;
        width: 734px;
        margin: 0px auto 0px;
        position: relative;
        z-index: 9;
        animation: biaoti2 1.2s ease-in-out 0.2s both;
        img {
            height: 230px;
        }
    }
    .bg2 {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .textbg {
        width: 178px;
    }
    .btn {
        width: 199px;
        height: 60px;
        line-height: 60px;
        border: none;
        outline: none;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background-size: cover;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
        // background: transparent;
    }
    .bg3 {
        text-align: center;
        padding: 0px 0px 32px;
        img {
            width: 895px;
        }
    }
}
</style>
