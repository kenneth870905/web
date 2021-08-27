<template>
    <div>
        <div class="swiper-container swiper_1" ref="swiper_1">
            <div class="swiper-wrapper">
            <div class="swiper-slide item" :i="index" v-for="(item, index) in 优惠活动" :key="index">
                    <img :src="item.Img" alt="" srcset="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import { api_获取优惠列表 } from "@/api/优惠接口.js";

import Swiper from "swiper";
export default {
    name:"",
    data() {
        return {
            优惠活动:[],            
        }
    },
    methods: {
        设置轮播(){
            //防止有时候失败
            setTimeout(() => {
                var swiper = new Swiper(this.$refs.swiper_1, {
                    loop: true, //循环
                    autoplay : 3000,
                    autoplayDisableOnInteraction : false,
                    pagination: {
                        el: ".swiper-pagination"
                    }
                });
            }, 300);
        },
        跳转(item){
            // item.Url ='http://www.agpromotion.net/events/mastertour/201912/index.php'
            if(item.Url){
                if(item.Url.startsWith('#')){
                    this.$router.push(item.Url.substring(2));
                }else if(item.Url.startsWith('http')){
                    if (window.plus) {
                        plus.runtime.openURL(item.Url);
                    }else{
                        try {
                            window.webkit.messageHandlers.FillMoney.postMessage({ link: item.Url });                        
                        } catch (error) {
                            window.open(item.Url,'_blank');
                        }
                    }
                }else{
                    this.$router.push('/ifr/zdy?u='+item.Url)
                }
            }else{
                this.$router.push('/home/discounts?i='+item.Id)
            }
        }
    },
    mounted() {
        var this_1=this;
        
        api_获取优惠列表({'home':true,type:''}).then(x=>{
            this.优惠活动=x.data;
            this.$nextTick(this.设置轮播())
        })

        $(this.$refs.swiper_1).on('click','.item',function(){
            var index=$(this).attr('i');
            console.log(index);
            this_1.跳转(this_1.优惠活动[index]);
        })
    },
}
</script>

<style lang="scss" scoped>
.swiper_1 {
    height: _vw(134);
    // height: calc(100vw * ( 134 / 375 ));
    .swiper-slide {
        height: _vw(134);
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
