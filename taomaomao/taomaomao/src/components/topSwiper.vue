<template>
    <swiper :options="swiperOption" ref="mySwiper" @click-slide="handleClickSlide">
        <swiper-slide v-for="(item, index) in 轮播图" :key="index" >
            <img :src="$api_url+'/tmm/public/storage/'+item.imgUrl" alt="" srcset="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import {mapActions, mapState} from 'vuex'
export default {
    name: "",
    components:{
        Swiper,
        SwiperSlide
    },
    data() {
        return{
            swiperOption:{
                loop:true,
                autoplay:true,
                initialSlide:1,
                pagination:{
                    el:'.swiper-pagination'
                }
            }
        }
    },
    computed: {
        ...mapState({
            轮播图:'轮播图'
        })
    },
    methods:{
        ...mapActions({
            获取轮播图:"获取轮播图"
        }),
        handleClickSlide(index, reallyIndex){
            var obj = this.轮播图[reallyIndex]
            if(obj.phoneUrl){
                location.href = obj.phoneUrl;
            }
        }
    },
    mounted() {
        if(this.轮播图.length==0){
            this.获取轮播图()
        }
        
    },

}
</script>

<style lang="scss" scoped>
.swiper-container {
    height: _vw(200);

    img {
        height: 100%;
    }
}

/deep/ .swiper-pagination-bullet {
    background: #000;
}
</style>
