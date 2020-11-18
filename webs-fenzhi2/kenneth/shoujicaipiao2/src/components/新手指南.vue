<template>
    <div class="新人指导">
        <div>
            <img class="bg" :src="config.img_url+'static/image/xinshouzhinan/xinshouzhinan_1.png'" alt="" srcset="">
            <img @click="关闭新手指南()" class="关闭按钮" src="static/image/xinshouzhinan/xinshouzhinan_2.png" alt="">
            <div class="内容">
                <ul class="header_1">
                    <li @click="切换(0)" :class="{'active':index==0}">注册</li>
                    <li @click="切换(1)" :class="{'active':index==1}">充值</li>
                    <!-- <li @click="切换(2)" :class="{'active':index==2}">聊天</li> -->
                </ul>
                <!-- <div class="swiper_2"> -->
                    <div class="swiper-container swiper_2" ref="swiper2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide item">
                                    <div class="swiper-container swiper_3" ref="swiper3">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide item">
                                                <img :src="config.img_url+'static/image/xinshouzhinan/xinshouzhinan_3.png'" alt="" srcset="">
                                            </div>
                                        </div>
                                        <!-- Add Pagination -->
                                        <div class="swiper-pagination swiper-pagination_3" ></div>
                                    </div>
                            </div>
                            <div class="swiper-slide item">
                                    <div class="swiper-container swiper_3" ref="swiper4">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide item">
                                                <img :src="config.img_url+'static/image/xinshouzhinan/xinshouzhinan_4.png'" alt="" srcset="">
                                            </div>
                                            <div class="swiper-slide item">
                                                <img :src="config.img_url+'static/image/xinshouzhinan/xinshouzhinan_5.png'" alt="" srcset="">
                                            </div>
                                            <div class="swiper-slide item">
                                                <img :src="config.img_url+'static/image/xinshouzhinan/xinshouzhinan_6.png'" alt="" srcset="">
                                            </div>
                                        </div>
                                        <!-- Add Pagination -->
                                        <div class="swiper-pagination swiper-pagination_4" ></div>
                                    </div>
                            </div>
                            <!-- <div class="swiper-slide item">
                                <div class="swiper-container swiper_3" ref="swiper5">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide item">
                                            <img src="static/image/xinshouzhinan/xinshouzhinan_7.png" alt="" srcset="">
                                        </div>
                                        <div class="swiper-slide item">
                                            <img src="static/image/xinshouzhinan/xinshouzhinan_8.png" alt="" srcset="">
                                        </div>
                                        <div class="swiper-slide item">
                                            <img src="static/image/xinshouzhinan/xinshouzhinan_9.png" alt="" srcset="">
                                        </div>
                                    </div>
                                    <div class="swiper-pagination swiper-pagination_5" ></div>
                                </div>
                            </div> -->
                        </div>
                        <!-- Add Pagination -->
                        <!-- <div class="swiper-pagination swiper-pagination_1" ></div> -->
                    </div>
                <!-- </div> -->
            </div>

            <div class="btn_1" @click="下一页()">
                <!-- {{(index==2 && index_3==2) ? '我知道了' : '下一页'}} -->
                {{ index_2==2 ? '我知道了' : '下一页'}}
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import { mapState } from 'vuex';
export default {
    name:"",
    inject:['关闭新手指南'],
    data() {
        return {
            index:0,
            index_1:0,
            index_2:0,
            index_3:0,

            swiperAll:"",
            swiper3:'',
            swiper4:"",
            swiper5:""
        }
    },
    computed: {
        ...mapState({
            config:'config',
        })
    },
    methods: {
        切换(index){
            //  mySwiper.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
            this.swiperAll.slideTo(index,300,false);
            this.index=index;    
        },
        下一页(){
            if(this.index==0){
                this.swiperAll.slideTo(1,300,false);
            }else if(this.index==1){
                if(this.index_2==2){
                    this.关闭新手指南()
                    // this.swiperAll.slideTo(2,300,false);
                }else{
                    this.swiper4.slideTo(this.index_2+1,300,false);
                }
            }else if(this.index==2){
                if(this.index_3==2){
                    this.关闭新手指南()
                }else{
                    this.swiper5.slideTo(this.index_3+1,300,false);
                }
            }
            this.获取index()
        },
        获取index(){
            var this_1=this;
            this.swiperAll.wrapper.transitionEnd(function () {
                console.log(0,this_1.swiperAll.activeIndex)
                this_1.index=this_1.swiperAll.activeIndex;
            });
            this.swiper3.wrapper.transitionEnd(function () {
                console.log(1,this_1.swiperAll.activeIndex);
                this_1.index_1=this_1.swiper3.activeIndex;
            });
            this.swiper4.wrapper.transitionEnd(function () {
                console.log(2,this_1.swiperAll.activeIndex);
                this_1.index_2=this_1.swiper4.activeIndex;
            });
            // 暂时隐藏
            // this.swiper5.wrapper.transitionEnd(function () {
            //     console.log(3,this_1.swiperAll.activeIndex)
            //     this_1.index_3=this_1.swiper5.activeIndex;
            // });
        }
    },
    mounted() {
        var this_1=this;
         setTimeout(()=>{
            this.swiperAll = new Swiper(this.$refs.swiper2, {
                slidesPerView : 1,
                onTransitionEnd: function(swiper){
                    this_1.index=this_1.swiperAll.activeIndex;
                }
            });

            this.swiper3 = new Swiper(this.$refs.swiper3,{
                nested:true,
                slidesPerView:1,
                pagination: '.swiper-pagination_3',
                paginationClickable: true,
                onTransitionEnd: function(swiper){
                    this_1.index_1=this_1.swiper3.activeIndex;
                }
            })
            
            this.swiper4 = new Swiper(this.$refs.swiper4,{
                nested:true,
                slidesPerView:1,
                pagination: '.swiper-pagination_4',
                paginationClickable: true,
                onTransitionEnd: function(swiper){
                    this_1.index_2=this_1.swiper4.activeIndex;
                }
            })
            
            // 暂时隐藏
            // this.swiper5 = new Swiper(this.$refs.swiper5,{
            //     nested:true,
            //     slidesPerView:1,
            //     pagination: '.swiper-pagination_5',
            //     paginationClickable: true,
            //     onTransitionEnd: function(swiper){
            //         this_1.index_3=this_1.swiper5.activeIndex;
            //     }
            // });

        },1000)
    },
}
</script>

<style lang="scss" scoped>
.新人指导{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    >div{
        position: relative;
        width: 90%;
        .bg{
            width: 100%;
        }
        .关闭按钮{
            position: absolute;
            top: _vw(18);
            right: _vw(-6);
            width: _vw(30);
            height: _vw(30);
            z-index: 1;
        }
        .内容{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            padding: _vw(42) 0px 0px 0px;
            display: flex;
            flex-direction: column;
        }
        .header_1{
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            padding: 0px _vw(35);
            li{
                width: _vw(80);
                height: _vw(30);
                line-height: _vw(30);
                text-align: center;
                color: #ffffff;
                border-radius: _vw(30);
            }
            .active{
                background: linear-gradient(red, #bd000d);
            }
        }
        .swiper_2{
            width: 100%;
            flex-grow: 1;
            height: 0;
            padding-top: _vw(25);
        }
        .swiper_3{
            text-align: center;
            height: 100%;
            padding-bottom: _vw(36);
            img{
                height: 100%;
            }
        }
        .btn_1{
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: _vw(-36);
            margin: auto;
            width: _vw(110);
            height: _vw(30);
            line-height: _vw(30);
            text-align: center;
            color: #ffffff;
            background: linear-gradient(red, #bd000d);
            border-radius: _vw(30);
            box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.4);
        }
    }
}
</style>
