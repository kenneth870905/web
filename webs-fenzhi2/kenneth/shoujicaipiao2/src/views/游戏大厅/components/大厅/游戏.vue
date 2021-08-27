<template>
    <div class="游戏大厅 mui-fullscreen">
        <ul class="header_1">
            <li v-if="item.title!='彩票'" v-for="(item, index) in 游戏彩票类型" :key="index" :class="{'active':item==选中游戏}" @click="切换游戏(item)">{{item.title}}</li>
        </ul>
        <div class="swiper_1" v-show="!选中游戏.noSub">
            <div class="swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide item" @click="选中类型(index)" :class="{'active':选中游戏分类==index}" v-for="(item, index) in 选中游戏.children" :key="index">{{item.title}}</div>
                </div>
            </div>
        </div>
        <div class="列表" :class="选中游戏.title+'_1'">
            <ul :class="选中游戏.title">
                <li class="" @click="跳转游戏(item)" v-for="(item, index) in 游戏列表" :key="index">
                    <div class="img_box">
                        <!-- <img v-if="!选中游戏.noSub" :src="config.img_url+ imgheader+item.imgid+imgtype" alt="" srcset="">
                        <img v-if="选中游戏.noSub" :src="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext" alt="" srcset=""> -->
                        <img v-if="!选中游戏.noSub" v-lazy="config.img_url+imgheader+item.imgid+imgtype" :key="config.img_url+imgheader+item.imgid+imgtype">
                        <img v-if="选中游戏.noSub" v-lazy="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext" :key="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext">
                    </div>
                    <div class="text_box">{{item.title}}</div>
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
            swiper2:""
        }
    },
    computed: {
        ...mapState({
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
                this.$router.push('/login');
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
    padding-top: 44px;
    padding-bottom: 50px;
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
        left: 0px;
        right: 0px;
        bottom: _vw(-4);
        margin: auto;
        content: "";
        height: 2px;
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
    &.真人_1,
    &.捕鱼_1,
    &.体育_1{
        background: none;
    }
}

.真人,
.捕鱼,
.棋牌,
// .体育,
.电子{
    display: flex;
    flex-wrap: wrap;
    font-size: _vw(12);
    text-align: center;
    padding: _vw(10) 0px 0px;
}

// .体育,
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

.捕鱼,
.真人{
    display: flex;
    flex-wrap: wrap ;
    font-size: _vw(13);
    text-align: center;
    >li{
        width: 50%;
        padding:_vw(3);
        box-sizing: border-box;
        text-align: center;
        .img_box{
            font-size: 0px;
            height: _vw(105);
            img{
                width: 97%;
                max-height: 100%;
                // height: 97%;
                max-width: 100%;
                border-radius: 5px;
                box-shadow: 0px 0px 3px 0px #929292;
                object-fit: cover;
            }
        }
        .text_box{
            display: none;
        }
    }
}

.体育{
    position: relative;
    // padding: _vw(230) _vw(5) _vw(5);
    padding: _vw(10) _vw(10) _vw(5);
    background-size: cover;
    background-position: center;
    .遮罩{
        position: absolute;
        top: _vw(180);
        left: 0px;
        width: 100%;
        height: _vw(50);
        background: linear-gradient(0deg, #0c893d, #14903d00);
    }
    li{
        font-size: 0px;
        margin: 0px 0px _vw(10);
        // border-bottom: 1px solid #000000;
        border-radius: 5px;
        // box-shadow: 0 0.05333rem 0.21333rem rgba(50,0,0,.2);
        box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.53);
        img{
            height: _vw(94);
            width: 100%;
            border-radius: 5px;
        }
    }
}
</style>

