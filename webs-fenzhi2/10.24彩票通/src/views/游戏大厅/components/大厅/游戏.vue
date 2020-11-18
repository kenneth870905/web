<template>
    <div class="游戏大厅 mui-fullscreen">
        <ul class="header_1" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <li v-if="item.title!='彩票'" v-for="(item, index) in 游戏彩票类型" :key="index" :class="{'active':item==选中游戏}" @click="切换游戏(item)">{{item.title}}</li>
        </ul>
        <div class="swiper_1" v-show="!选中游戏.noSub">
            <div class="swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide item" @click="选中类型(index)" :class="{'active':选中游戏分类==index}" v-for="(item, index) in 选中游戏.children" :key="index">{{item.title}}</div>
                </div>
            </div>
        </div>
        <div class="列表">
            <ul :class="选中游戏.title">
                <li class="" @click="跳转游戏(item)" v-for="(item, index) in 游戏列表" :key="index">
                    <div class="img_box">
                        <img v-if="!选中游戏.noSub" :src="config.img_url+ imgheader+item.imgid+imgtype" alt="" srcset="">
                        <img v-if="选中游戏.noSub" :src="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext" alt="" srcset="">
                        <!-- <img v-if="!选中游戏.noSub" v-lazy="config.img_url+imgheader+item.imgid+imgtype" :key="config.img_url+imgheader+item.imgid+imgtype">
                        <img v-if="选中游戏.noSub" v-lazy="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext" :key="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext"> -->

                    </div>
                    <div>{{item.title}}</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

import Swiper from 'swiper'
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            swiper2:"",
             bai: {
                color: "#ffffff",
                topbj: "#5dadff",
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            }
        }
    },
    computed: {
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
        ...mapState({
            皮肤切换: '皮肤切换',
            config:'config',
            游戏彩票类型:'游戏彩票类型',
            选中游戏:x=>x["游戏大厅"]["选中游戏"],
            选中游戏分类:x=>x['游戏大厅']['选中游戏分类'],
            userinfo:x=>x.user.userinfo
        }),
        游戏列表(){
            if(!this.选中游戏){
                return []
            }
            if(this.选中游戏.noSub){
                return this.选中游戏.children
            }else{
                try {
                    return this.选中游戏.children[this.选中游戏分类].children
                } catch (error) {
                    return []                    
                }
            }
        },
        imgheader(){
            if(this.选中游戏 && this.选中游戏.children && this.选中游戏.children[this.选中游戏分类]){
                return 'static/image/home/'+this.选中游戏.children[this.选中游戏分类].img+'/'
            }else{
               return ''
            }
        },
        imgtype(){
            if(this.选中游戏 && this.选中游戏.children && this.选中游戏.children[this.选中游戏分类]){
                return this.选中游戏.children[this.选中游戏分类].ext
            }else{
                return ""
            }
        },
    },
    methods: {
        ...mapMutations({
            设置state:"游戏大厅/设置state"
        }),
        ...mapActions({
            设置类型:"进入游戏/设置类型"
        }),
        跳转游戏(item){
            if(this.userinfo.UserId){
                this.设置类型(item);
            }else{
                this.$router.push('/');
            }
        },
        切换游戏(item){
            this.设置state(['选中游戏',item])
            this.设置state(['选中游戏分类',0]);
            this.$nextTick(()=>{
                setTimeout(() => {
                    this.swiper2.slideTo(0, 300, false);                
                }, 300);
            })
        },
        选中类型(index){
            if(index<2){
                this.swiper2.slideTo(0, 300, false);                
            }else{
                this.swiper2.slideTo(index-2, 300, false);
            }
            this.设置state(['选中游戏分类',index])
        }
    },
    mounted() {
        this.swiper2 = new Swiper(this.$refs.swiper, {
            slidesPerView : 4.5,
            observer:true,
            // loop :true, //循环
        });
    },
}
</script>

<style lang="scss" scoped>
.mui-fullscreen{
    padding-top: _vw(4);
    padding-bottom: _vw(0);
}
.游戏大厅{
    height: 100%;
    display: flex;
    flex-direction: column;
}

.header_1{
    flex-shrink: 0;
    display: flex;
    height: _vw(40);
    display: flex;
    color: #ffffff;
  
    @include bgcolor;
    align-items: center;
    text-align: center;
    color: hsla(0,0%,100%,.85);
    font-size: _vw(15);
   
    >li{
        width: 20%;
        position: relative;
        flex-grow: 1;
    }
    .active{
        color:#ffffff;
    }
    .active::after{
        position: absolute;
        width: _vw(20);
        left: _vw(0);
        right: _vw(0);
        bottom: _vw(-4);
        margin: auto;
        content: "";
        height: _vw(2);
        background: #ffffff;

    }
}

.swiper_1{
    flex-shrink: 0;
    margin: 0px 0px 5px 0px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    line-height: _vw(35);
    >div{
        width: 100%;
    }
    .item{
        font-size: _vw(12);
        color: #777;
    }
    .active{
        @include textcolor;
    }
    .swiper-slide{
        border-right: 1px solid #cccccc;
    }
}

.列表{
    flex-grow: 1;
    overflow: auto;
    height: 100%;
    padding-bottom: 40px;
    background: #fff;
    // box-sizing: border-box;
}

.真人,
.棋牌,
.体育,
.电子{
    display: flex;
    flex-wrap: wrap;
    font-size: _vw(12);
    text-align: center;
    padding: _vw(10) 0px 0px;
}

.体育,
.棋牌,
.电子{
    >li{
        width: 25%;
        margin: 0px 0px _vw(10);
        .img_box{
            width: _vw(65);
            height: _vw(65);
            margin: 0px auto _vw(4);
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

.真人{
    >li{
        width: 50%;
        margin: 0px 0px _vw(10);
        .img_box{
            width: 90%;
            height: _vw(100);
            margin: 0px auto _vw(4);
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

</style>

