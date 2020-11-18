<template>
    <div>
        <swiper class="swiper" :options="swiperOption" @click-slide="handleClickSlide">
            <swiper-slide v-for="(item,index) in 轮播图" :key="index">
                <img :src="$img_url+item.pcImgUrl" alt="" srcset="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
// https://github.com/surmon-china/vue-awesome-swiper
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
export default {
    name: "",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOption: {
                loop:true,
                autoplay : {
                    delay:3000
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true
                }
            }
        }
    },
    computed: {
        ...mapState({
            轮播图:"轮播图"   
        })
    },
    methods: {
        handleClickSlide(index, reallyIndex) {
            if(this.轮播图[reallyIndex].pcUrl){
                location.href = this.轮播图[reallyIndex].pcUrl
            }
        }  
    },
    mounted() {
        // console.log(this.$api_url)
    },
}
</script>

<style lang="scss" scoped>
.swiper-slide{
    height: 100vw / 16 * 9;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>