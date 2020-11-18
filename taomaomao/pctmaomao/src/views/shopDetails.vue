<template>
    <div class="shopDetails">
        <div class="t1">{{shop.shopName}}</div>
        <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
            <swiper-slide v-for="item in shop.imgList">
                <img :src="$img_url+item" alt="" srcset="">
            </swiper-slide>
        </swiper>
        <!-- swiper2 Thumbs -->
        <div class="swiper2">
            <div class="swiper-button-prev" slot="button-prev"></div>
            <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
                <swiper-slide v-for="item in shop.imgList">
                    <img :src="$img_url+item" alt="" srcset="">
                </swiper-slide>
            </swiper>
            <div class="swiper-button-next" slot="button-next"></div>
        </div>

        <ul class="img_list">
            <li v-for="item in shop.imgList">
                <img :src="$img_url+item" alt="">
            </li>
        </ul>

    </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
export default {
    name: "",
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOptionTop: {
                effect:'fade',
                loop: true,
                loopedSlides: 5,    // looped slides should be the same
                spaceBetween: 10,
                autoplay:{
                    disableOnInteraction:false,
                    delay:3000
                }
            },
            swiperOptionThumbs: {
                loop: true,
                loopedSlides: 5,    // looped slides should be the same
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                slideToClickedSlide: true,
                touchRatio: 0.2,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            shop: {
                imgList: []
            },
            id: ""
        }
    },
    computed:{
        swiperTop(){
            return this.$refs.swiperTop.$swiper
        },
        swiperThumbs(){
            return this.$refs.swiperThumbs.$swiper
        }
    },
    methods: {
        getShop() {
            this.$axios.post('/tmm/public/index.php/shop/getshopById', { id: this.id })
                .then(res => {
                    this.shop = res.data.data
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
    mounted() {
        this.id = this.$route.query.id;
        this.getShop()


        // setTimeout(() => {
        //     this.swiperTop.init();
        //     this.swiperThumbs.init()
        // }, 3000);

        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.$swiper
            const swiperThumbs = this.$refs.swiperThumbs.$swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
        })
    },

}
</script>

<style lang="scss" scoped>
.shopDetails{
    width: 770px;
    margin: 0px auto;
}
.t1 {
    font-size: 25px;
    color: #dabb8d;
    line-height: 96px;
    letter-spacing: 1px;
    text-align: center;
    position: relative;
    margin: 55px 0px 50px;
}
.gallery-top{
    height: 770px /16 * 9;
    cursor: pointer;
    border:10px solid #f1f1f1;
    margin: 0px auto 30px;
    .swiper-slide img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.swiper2{
    height: 100px;
    position: relative;
    padding: 0px 25px;
    margin: 10px auto 50px;
    .gallery-thumbs{
        height: 100px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
        .swiper-slide{
            width: 100px / 9 * 16;
            border: 4px solid #e1a85b;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .swiper-slide.swiper-slide-active{
            border: 4px solid #ff6600;
        }
    }
    .swiper-button-prev, .swiper-button-next{
        top: 0px;
        border: 1px solid #ccc;
        height: 100%;
        margin: 0px;
        width: 22px;
        &:focus{
            outline: none;
        }
    }
    .swiper-button-prev::after, .swiper-button-next::after{
        font-size: 20px;
    }
    .swiper-button-prev{
        left: 0px;
    }
    .swiper-button-next{
        right: 0px;
    }
}

.img_list{
    margin: 20px auto 50px;
    font-size: 0px;
    img{
        width: 100%;
    }
}

</style>