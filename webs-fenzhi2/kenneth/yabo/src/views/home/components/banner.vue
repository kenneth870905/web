<template>
    <div>
         <swiper ref="swiper1" class="swiper1" :options="swiperOption_1">
            <swiper-slide v-for="(item, index) in banner"  :key="index">
                <img :src="item" />
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div class="缩略图">
            <ul>
                <li @click="slideTo(index)" :class="{active:active==index}" v-for="(item, index) in banner" :key="index">
                    <img :src="item" alt="">
                </li>
            </ul>
        </div>  
        <div class="滚动通知">
            <ul class="w1200">
                <li>
                    <img src="static/image/message.png" alt="" srcset="">
                    <span>亚博公告：</span>
                </li> 
                <li>
                    <marquee>尊敬的客户：亚博给力优惠，每天签到，即可领取相应彩金，连续签到满7天，德尔玛加湿器送到家。详情请查阅优惠活动页面。尊敬的客户：体育投注界面直播动画仅供参考，下注时请以当前盘口实时比分为准。感谢您的理解与支持！</marquee>
                </li>
                <li>
                    <img src="static/image/icon_service.png" alt="" srcset="">
                    <span>在线客服</span>
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
            banner:[
                "https://static.0am08m.com///prod/banner/m_a8fb456bdd508b3c34d6fb5e5cff76748f027930.jpg",
                "https://static.0am08m.com///prod/banner/m_c858a75c4b6d93b98005ae7f00dedc9c8ff9b527.jpg",
                "https://static.0am08m.com///prod/banner/m_fdda9146f7044dfaad8c87dd17d8d3fe2f219e54.jpg",
                "https://static.0am08m.com///prod/banner/m_f8796a7d369158a587bd13ebba0e8f8621ddf140.jpg",
                "https://static.0am08m.com///prod/banner/m_aa95aa8cda4af848dd2c171e5171a7acf0b6271c.jpg",
                "https://static.0am08m.com///prod/banner/m_e71a916ac9a9f4ed0fdafe5942b1f4eeedadeb1d.jpg",
                "https://static.0am08m.com///prod/banner/m_554fd5a4847e93c0d1f3092b44174f38af272552.jpg",
                "https://static.0am08m.com///prod/banner/m_4c7169e8b97d4f53035d349a8f5918b7c56c22ca.jpg",
                "https://static.0am08m.com///prod/banner/m_31eb8efe9d28e6511f3563075f01f806b2d23c2c.jpg",
                "https://static.0am08m.com///prod/banner/m_c0b1a7152f7ecbc3b19e07b4ec5fe70e1d430337.jpg",
                "https://static.0am08m.com///prod/banner/m_b795f9a2b75b460d15ed7b0c553ce3708c9495e8.jpg"
            ],
            swiperOption_1: {
                loop:true,
                grabCursor : true,  //手掌样式
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on:{
                    slideChangeTransitionEnd:(x)=>{
                        try {
                            this.active = this.swiper1.realIndex
                        } catch (error) {}
                    },
                    click:()=>{
                        console.log('点击事件')
                    }
                }
            },
            active:0,
        }
    },
    computed: {
        swiper1() {
            return this.$refs.swiper1.swiper
        }
    },
    methods: {
        slideTo(index){
            this.active = index
            // this.swiper1.slideTo(index, 500, false)
            this.swiper1.slideToLoop(index,500,false)
        }
    },
}
</script>

<style lang="scss" scoped>
.swiper1{
    height: calc(100vw / 1920 * 500);
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    --swiper-navigation-size:24px;
    .swiper-button-prev,
    .swiper-button-next{
        width: 36px;
        height: 72px;
        background: #444749;
        color: #ffffff;
    }
    .swiper-button-prev{
        left: 0px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    } 
    .swiper-button-next{
        right: 0px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
}

.缩略图{
    position: relative;
    z-index: 2;
    ul{
        position: absolute;
        left: 0px;
        bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    li{
        width: 115px;
        height: 50px;
        margin: 0px 4px;
        cursor: pointer;
        border-bottom: 4px solid #ffffff57;
    }
    .active{
        border-bottom:4px solid #2293fc;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.滚动通知{
    height: 42px;
    ul{
        height: 100%;
        display: flex;
        align-items: center;
    }
    li{
        white-space: nowrap;
    }
    li:nth-child(1){
        padding: 0px 10px 0px 0px;
    }
    li:last-child{
        padding: 0px 0px 0px 10px;
        color: #00afff;
    }
    img{
        vertical-align: middle;
        margin: 0px 10px 0px;
    }
}
</style>