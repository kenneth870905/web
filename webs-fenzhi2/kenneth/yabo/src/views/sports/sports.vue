<template>
    <div>
        <div class="sports" style="background-image:url('static/image/sports/background.png')">
            <div class="w1200">
                <div class="btnlist">
                    <div :class="{active:type==0}" @click="type=0">亚博体育</div>
                    <div :class="{active:type==1}" @click="type=1">IM体育</div>
                </div>
                <ul class="yabo" :class="{active:type==0}">
                    <li class="L">
                        <img src="static/image/sports/title.png">
                        <p>奇幻赛事、特别投注 ，各种趣味玩法，最全赛事覆盖助你花式收米赢到人生巅峰</p>
                        <div>去投注</div>
                    </li>
                    <li class="R">
                        <img src="static/image/sports/p_bg.png" alt="" srcset="">
                        <img src="static/image/sports/p1.png" alt="" srcset="">
                        <img src="static/image/sports/p2.png" alt="" srcset="">
                        <img src="static/image/sports/p3.png" alt="" srcset="">
                        <img src="static/image/sports/p4.png" alt="" srcset="">
                        <img src="static/image/sports/shadow.png" alt="" srcset="">
                    </li>
                </ul>
                <ul class="im" :class="{active:type==1}">
                    <li class="L">
                        <img src="static/image/sports/im_title.png">
                        <p>最多投注类型，最强投注体验，支持提前兑现，收米也要快人一步，想你所想，投你所爱</p>
                        <div>去投注</div>
                    </li>
                    <li class="R">
                        <img src="static/image/sports/p_bg.png" alt="" srcset="">
                        <img src="static/image/sports/im_p1.png" alt="" srcset="">
                        <img src="static/image/sports/im_p4.png" alt="" srcset="">
                        <img src="static/image/sports/im_p2.png" alt="" srcset="">
                        <img src="static/image/sports/im_p3.png" alt="" srcset="">
                        <img src="static/image/sports/shadow.png" alt="" srcset="">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            type: 0
        }
    },
}
</script>

<style lang="scss" scoped>
.sports {
    height: 790px;
    position: relative;
    background-size: cover;
    background-position: top;
    overflow: hidden;
}
.w1200 {
    position: relative;
    height: 100%;
}
.btnlist {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 46px 0px 0px;
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
    &:hover {
        background: linear-gradient(90deg, #489edb, #48cff7);
    }
}

@mixin 自定义animation($val) {
	animation:$val;
}
@mixin 生成keyframes($name,$obj) {
	@keyframes #{$name} {
        0% {
            // transform: translateY(35px);
            transform: translate( map-get($obj, x) ,map-get($obj, y) );
        }
        to {
            transform: translate(0px,0px);
        }
	}
}
@keyframes LIn {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
@keyframes Lout {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(1.3);
        opacity: 0;
    }
}

.yabo,
.im{
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
}
.yabo {
    &.active {
        z-index: 1;
        .L {
            // animation: LIn 0.3s ease 0.3 forwards;
            animation: LIn 0.3s forwards;
        }
        .R {
            animation: LIn 0.3s forwards;
            img:nth-child(2){
                @include 生成keyframes( a1,( x:0px, y:40px ));
                @include 自定义animation(a1 1s);
            }
            img:nth-child(4){
                @include 生成keyframes( a2,( x:20px, y:0px ));
                @include 自定义animation(a2 1s);
            }
            img:nth-child(5){
                @include 生成keyframes( a3,( x:-20px, y:0px ));
                @include 自定义animation(a3 1s);
            }
        }
    }
    .L {
        animation: Lout 0.3s forwards;
        height: 100%;
        width: 611px;
        padding-top: 279px;
        text-align: center;
        img {
            width: 100%;
        }
        p {
            font-size: 18px;
            line-height: 24px;
            color: #777;
            margin: 11px auto 23px;
        }
        div {
            @include btn;
        }
    }
    .R {
        animation: Lout 0.3s forwards;
        height: 100%;
        width: 590px;
        margin: 140px 0px 0px -37px;
        position: relative;
        img {
            position: absolute;
            transition: all 0.3s;
        }
        img:nth-child(1) {
            width: 100%;
        }
        img:nth-child(2) {
            left: 130px;
            top: -69px;
            width: 328px;
        }
        img:nth-child(3) {
            top: 151px;
            left: 191px;
            width: 220px;
            z-index: 2;
        }
        img:nth-child(4) {
            top: 163px;
            left: 75px;
            width: 233px;
        }
        img:nth-child(5) {
            top: 163px;
            right: 54px;
            width: 277px;
        }
        img:nth-child(6) {
            top: 487px;
            left: -151px;
            width: 904px;
            z-index: 0;
        }
    }
}

.im{
   &.active {
       z-index: 1;
        .L {
            animation: LIn 0.3s forwards;
        }
        .R {
            animation: LIn 0.3s forwards;
            img:nth-child(2){
                @include 生成keyframes( a1,( x:0px, y:40px ));
                @include 自定义animation(a1 1s);
            }
            img:nth-child(4){
                @include 生成keyframes( a2,( x:20px, y:0px ));
                @include 自定义animation(a2 1s);
            }
            img:nth-child(5){
                @include 生成keyframes( a3,( x:-20px, y:0px ));
                @include 自定义animation(a3 1s);
            }
        }
    }
    .L {
        animation: Lout 0.3s forwards;
        height: 100%;
        width: 611px;
        padding-top: 279px;
        text-align: center;
        img {
            width: 100%;
        }
        p {
            font-size: 18px;
            line-height: 24px;
            color: #777;
            margin: 11px auto 23px;
        }
        div {
            @include btn;
        }
    }
    .R {
        animation: Lout 0.3s forwards;
        height: 100%;
        width: 590px;
        margin: 140px 0px 0px -37px;
        position: relative;
        img {
            position: absolute;
            transition: all 0.3s;
        }
        img:nth-child(1) {
            width: 100%;
        }
        img:nth-child(2) {
            left: 130px;
            top: -69px;
            width: 328px;
        }
        img:nth-child(3) {
            top: 151px;
            left: 191px;
            width: 220px;
            z-index: 2;
        }
        img:nth-child(4) {
            top: 163px;
            left: 75px;
            width: 233px;
        }
        img:nth-child(5) {
            top: 163px;
            right: 54px;
            width: 277px;
        }
        img:nth-child(6) {
            top: 487px;
            left: -151px;
            width: 904px;
            z-index: 0;
        }
    }
}



</style>
