<template>
    <div class=" immortal_box" :style="'background-image: url('+fishList.fishBanner+')'">
        <div class="swiper-container swiper_1" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide item" v-for="(item, index) in 捕鱼达人" :key="index">
                    <!-- {{item}} -->
                    <img :src="'image/fish/'+item.img" alt="" srcset="">
                    <div class="btn_1" :i="index">开始游戏</div>
                </div>
            </div>
            <div class="swiper-button-next" ref="next1"></div>
            <div class="swiper-button-prev" ref="prev1"></div>
        </div>

        <div class="bg-animation" ref="小鱼">
            <img class="active" src="image/fish/yu-1.png" width="130">
            <img class="active" src="image/fish/yu-2.png" width="90">
            <img src="image/fish/yu-3.png" width="110">
            <img src="image/fish/yu-5.png" width="100">
            <img src="image/fish/yu-6.png" width="140">
            <img src="image/fish/yu-7.png" width="110">
        </div>

        <!-- 气泡 -->
        <div class="qipao" ref="气泡">
            <div v-for="item in 50" :key="item.id">
                <img src="image/fish/bubble.png" />
            </div>
        </div>

    </div>
</template>
<script>

import { mapMutations, mapActions } from 'vuex'
import $ from "jquery";
import Mock from 'mockjs'
export default {
    data() {
        return {
            config: config,
            zhuangshi: config.img_url + 'image/fish/buyu-shoujiban.png',
            type: 0,
            fishList: {
                fishBanner: 'image/fish/buyu-bgwps.jpg'
            },
            捕鱼达人: [
                { name: "AG捕鱼王", type: "ag", gid: 6, img: 'ntb-fish-ag-2.jpg' },
                { name: "BG捕鱼大师", type: "BG", gid: 105, img: 'bg-byds.png' },
                { name: "BG西游捕鱼", type: "BG", gid: 411, img: 'bg-xyby.png' },
                { name: "BBIN捕鱼达人", type: "BY", gid: 30599, img: 'ntb-fish-bbin1-2.jpg' },
                { name: "BBIN捕鱼大师", type: "BY", gid: 38001, img: 'ntb-fish-bbin2-2.jpg' },
                { name: "LY捕鱼大作战", type: "LY", gid: 510, img: 'ly_1.png' },
                { name: "CQ9一炮捕鱼", type: "CQ", gid: 'AT01', img: 'cq9-1.png' },
                { name: "SW捕鱼多福", type: "SW", gid: 'sw_fufish_intw', img: 'sw-1.png' },

                { name: "KY红包捕鱼", type: "KY", gid: '510', img: '510.png' },
                // { name: "QL李逵捕鱼", type: "QL", gid: 'lkpy', img: '51.png' },
                { name: "CQ9皇金渔场", type: "CQ", gid: 'AB3', img: 'AB3.png' },
                // { name: "761金蟾捕鱼", type: "QL", gid: 'jcby', img: '52.png' },
                // { name: "761大圣闹海", type: "QL", gid: 'dsnh', img: '53.png' },
                // { name: "761海王捕鱼", type: "QL", gid: 'hwby', img: '54.png' }
            ]
        }
    },
    methods: {
        ...mapActions({
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框'
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        hover(type) {
            this.type = type
        },
    },
    mounted() {
        var this_1 = this;
        var mySwiper = new Swiper(this.$refs.swiper, {
            // autoplay: 3000,//可选选项，自动滑动
            // slidesPerView : 'auto',
            slidesPerView: 'auto',
            nextButton: this.$refs.next1,
            prevButton: this.$refs.prev1,
            autoplayDisableOnInteraction: false,
            mousewheelControl: true,   //鼠标
            // loop: true,
            // spaceBetween: 30
        })
        $(this.$refs.swiper).on('click', '.btn_1', function () {
            var index = $(this).attr('i');
            var item = this_1.捕鱼达人[index];
            var obj = {
                name: item.name,
                type: item.type,
                gid: item.gid
            }
            this_1.设置待进入游戏(obj);
            this_1.设置进入游戏弹框(true);
        })


        var img = this.$refs.小鱼.querySelectorAll('img')
        for (let i = 0; i < img.length; i++) {
            // console.log(img[i])
            img[i].style.top = 10 + 60 * i + 'px'
            setTimeout(() => {
                img[i].classList.add('active')
            }, 1000 * 3 * i)
        }
        function suiji(item) {
            var miao = Mock.Random.integer(5, 15)
            item.style.transition = 'all ' + miao + 's'
            item.style.top = Mock.Random.integer(0, 50) + '%'
            item.style.left = Mock.Random.integer(0, 100) + '%'
            var width = Mock.Random.integer(10, 50)
            item.style.width = width + 'px'
            item.style.height = width + 'px'
        }
        function chushihu(item) {
            item.style.transition = 'all 0s'
            item.style.top = '100%'
            item.style.left = Mock.Random.integer(10, 90) + '%'
            setTimeout(() => {
                suiji(item)
            }, 1000)
        }
        var div = this.$refs.气泡.querySelectorAll('div')
        var length = div.length
        setTimeout(() => {
            for (let i = 0; i < div.length; i++) {
                suiji(div[i])
            }
        }, 1000)
        setTimeout(() => {
            setInterval(() => {
                var suiji = Mock.Random.integer(0, length)
                chushihu(div[suiji])
            }, 200)
        }, 3000)
    },
}

</script>

<style lang="scss" scoped>
.swiper_1 {
    background: #000000;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    .swiper-wrapper {
        &:hover {
            .swiper-slide {
                opacity: 0.5;
            }
        }
    }
    .swiper-slide {
        transition: all 0.3s;
        width: 350px;
        box-sizing: border-box;
        border-left: 1px solid #000000;
        img {
            width: 100%;
        }
        .btn_1 {
            position: absolute;
            width: 100%;
            line-height: 44px;
            left: 0px;
            bottom: 0px;
            text-align: center;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: all 0.1s;
        }
        &:hover {
            opacity: 1 !important;
            .btn_1 {
                line-height: 50px;
                background: rgba(0, 0, 0, 0.6);
            }
        }
    }
    &:hover {
        .swiper-button-prev,
        .swiper-button-next {
            opacity: 1;
        }
    }

    .swiper-button-prev,
    .swiper-button-next {
        // height: 100%;
        height: 60px;
        width: 60px;
        border-radius: 100%;
        top: calc(50% - 30px);
        margin-top: 0px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.5s;
        background-size: 15px;
        opacity: 1;
    }
    .swiper-button-prev {
        left: 30px;
    }
    .swiper-button-next {
        right: 100px;
    }
    .swiper-button-disabled{
        display: none;
    }
}

.immortal_box {
    height: 1000px;
    background-size: cover;
    // background-size: 100% 100%;
    position: relative;
    .container {
        height: 100%;
        position: relative;
        z-index: 1;
    }
}

.qipao {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    // z-index: 1;
    overflow: hidden;
    div {
        position: absolute;
        transition: all 10s;
        // bottom: -100px;
        left: 50%;
        width: 50px;
        height: 50px;
        // right: 0px;
        // margin: 0px auto;
        top: 100%;
        img {
            max-width: 100%;
        }
    }
}

.bg-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
    img {
        position: absolute;
    }
    img:nth-child(2n) {
        left: -200px;
        top: 0px;
    }
    img:nth-child(2n-1) {
        right: -200px;
        top: 0px;
        transform: rotateY(180deg);
    }
    .active {
        animation: shangxia 10s infinite, right_1 30s linear infinite;
    }
    img:nth-child(2n).active {
        animation: shangxia 10s infinite, left_1 30s linear infinite;
    }

    // img:nth-child(1){
    //     animation:shangxia 10s infinite ,zuoyou 30s linear infinite;
    // }
}
@keyframes shangxia {
    0% {
        margin-top: 0px;
    }
    50% {
        margin-top: 40px;
    }
    100% {
        margin-top: 0px;
    }
}
@keyframes right_1 {
    0% {
        right: -200px;
    }
    100% {
        right: 120%;
    }
}
@keyframes left_1 {
    0% {
        left: -200px;
    }
    100% {
        left: 120%;
    }
}

.list_1 {
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    height: 320px;
    // width: 100%;
    width: 1040px;

    > li:nth-child(1) {
        border-left: none;
    }
    li {
        // transition: all 0.3s;
        position: relative;
        border-left: 2px solid #000000;
        .zhuangshi {
            position: absolute;
            top: 0px;
            right: 0px;
        }
        > div:nth-child(1) {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
        }
        > div:nth-child(2) {
            opacity: 0;
            width: 100%;
            height: 100%;
            position: relative;
            p {
                position: absolute;
                left: 0px;
                bottom: 0px;
                display: block;
                line-height: 50px;
                text-align: center;
                height: 50px;
                width: 100%;
                background: rgba(0, 0, 0, 0.4);
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.1s;
            }
            p:hover {
                height: 53px;
                background: rgba(0, 0, 0, 0.5);
            }
        }
        .bg {
            width: 100%;
            height: 100%;
        }
    }

    .li_a {
        transition: all 0.5s;
        width: 160px;
        height: 100%;
        flex-shrink: 0;
        > div:nth-child(1) {
            opacity: 1;
        }
    }
    .li_A {
        transition: all 0.3s;
        width: 400px;
        flex-grow: 1;
        height: 100%;
        background-size: 100% 100%;
        > div:nth-child(2) {
            opacity: 1;
        }
    }
}
</style>
