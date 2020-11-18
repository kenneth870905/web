<template>
    <div class="index">
        <div class="title" v-if="!$route.meta.隐藏头部">
            <div class="kefu1" @click="go('/login')">登陆</div>
            <div class="log_box"><img src="https://bdpz.com/public/image/2019-06-05/331504f5-4d7e-4ca4-adaa-4955b2c62a60.png" alt=""></div>
            <div class="kefu2" @click="go('/register')">注册</div>
        </div>

        <div class="轮播">
           
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in banner" :key="index">
                    <div class="lb_box_img" @click="go轮播(item.Id)"><img :src="item" alt></div>
                </van-swipe-item>
            </van-swipe>
        </div>

        


       
      

    </div>
</template>
<script>
// import {api_首页上证深证指数 } from "@/api/股票.js";

export default {
    data() {
        return {
         
            banner:[
                'static/image/home/banner_1.jpg',
                'static/image/home/banner_2.jpg',
                'static/image/home/banner_3.jpg',
                'static/image/home/banner_4.jpg'
            ],
          
        }
    },
    components: { // 注册组件

    },
    computed: {
        
    },
    created() {
     
    },
    methods: {
        clicktite(index) {
            this.tableType = index
        },
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        }
    },
    mounted() {
        
    },
}


</script>

<style lang="scss" scoped>
.title {
        position: fixed;
        background: #ffffff;
        width: 100%;
        z-index: 10;
        top: 0px;
        left: 0px;
        z-index: 10;
        height: _vw(50);
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding: 0px _vw(8) 0px _vw(8);
        border-bottom: 1px solid #ccc;
        .kefu1,
        .kefu2 {
            position: absolute;
            top: 0px;
            line-height: _vw(50);
            text-align: center;
            color: red;
        }
        .kefu1{
            left: _vw(10);
        }
        .kefu2{
            right: _vw(10);
        }
        .log_box {
            margin-top: _vw(10);
            height: _vw(30);
            width: _vw(160);
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

.titleActive {
    color: red;
    background: #fff4ee !important;
}
p {
    margin: 0px;
}
.index {
    padding-bottom: _vw(50);
    background: #f3f3f4;
    padding-top: _vw(50);
    .轮播 {
        height: calc(100vw / 2);
        .lb_box_img{
            height: calc(100vw / 2);
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        // width: 100%;
    }
   
}

// <script>
//   function noticeUp(obj,top,time) {
//     $(obj).animate({
//         marginTop: top
//     }, time, function () {
//         $(this).css({marginTop:"0"}).find(":first").appendTo(this);
//     })
// }
// </script>
// <script>
//     $(function () {
//         // 调用 公告滚动函数
//         setInterval("noticeUp('.notice ul','-35px',500)", 2000);
//     });
// </script>
</style>