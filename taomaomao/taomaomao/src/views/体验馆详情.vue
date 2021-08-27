<template>
    <div>
        <navigation />
        <topSwiper />

        <div class="title">{{shop.shopName}}</div>

        <swiper ref="swiperTop" class="swiper gallery-top" :options="swiperOptionTop">
            <swiper-slide v-for="(item,index) in shop.imgList" :key="index"> <img :src="`${$api_url}/tmm/public/storage/${item}`" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="swiper2">
            <div class="swiper-button-prev swiper-button-black"></div>
            <swiper ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs">
                <swiper-slide v-for="(item,index) in shop.imgList" :key="index">  <img :src="`${$api_url}/tmm/public/storage/${item}`" alt=""></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="swiper-button-next swiper-button-black"></div> 
        </div>

        <ul class="img-list">
            <li v-for="(item,index) in shop.imgList" :key="index">
                <img :src="`${$api_url}/tmm/public/storage/${item}`" alt="">
            </li>
        </ul>

        <footer1 />
    </div>
</template>

<script>

import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import footer1 from '@/components/footer.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    name: "",
    components: {
        navigation,
        topSwiper,
        footer1,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOptionTop: {
                loop: true,
                loopedSlides: 1,
            },
            swiperOptionThumbs: {
                loop: true,
                loopedSlides: 1,
                autoplay:true,
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            id:"",
            shop:{}
        }
    },
    computed: {
        swiperTop() {
            return this.$refs.swiperTop.$swiper
        }
    },
    methods: {
        getshopById(){
            this.$axios.post('Shop/getshopById',{id:this.id}).then(res => {
                if(res.data.code!=1) return;
                this.shop = res.data.data
            }).catch(err => {})
        }  
    },
    mounted() {
        this.$nextTick(() => {
            var swiperTop = this.$refs.swiperTop.$swiper
            var swiperThumbs = this.$refs.swiperThumbs.$swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
        });
        this.id = this.$route.query.id
        this.getshopById()

    },
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    color: #dabb8d;
    margin: 55px auto 20px;
    line-height: 27px;
    font-size: 20px;
}
.gallery-top {
    width: 345px;
    height: 195px;
    // border: 8px solid #eeeeee;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.swiper2 {
    width: 345px;
    height: 50px;
    margin: 10px auto;
    display: flex;
    .swiper-button-prev,
    .swiper-button-next {
        position: relative;
        height: 100%;
        border: 1px solid #ccc;
        left: auto;
        right: auto;
        margin: auto;
        top: auto;
        width: 20px;
        flex-shrink: 0;
        &::after {
            font-size: 20px;
        }
    }
    .swiper-container {
        height: 100%;
        margin: 0px 5px;
        width: 290px;
    }
    .swiper-slide-active {
        border: 5px solid #ff6600;
    }
    .swiper-slide {
        width: 88px;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.img-list{
    width: 345px;
    margin: 40px auto 10px;
    img{
        width: 100%;
    }
}
</style>
