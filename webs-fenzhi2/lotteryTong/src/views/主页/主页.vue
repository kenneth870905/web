<template>
    <div class="主页">
        <headerT></headerT>
       <div class="content" :style="{'background-color':皮肤区分.backg}" >

              <div class="轮播">
                <van-swipe :autoplay="3000" indicator-color="white" class="ii">
                    <van-swipe-item v-for="(item, index) in banner" :key="index">
                        <div class="lb_box_img" @click="go轮播(item.Id)"><img :src="item" alt></div>
                    </van-swipe-item>
                </van-swipe>
                <div class="购彩资讯">
                    <img v-if="huanfu" @click="首页类型切换()"  :src=" honmeT ? bai.lefimgzx : bai.leftimggc" alt>
                    <img  v-if="!huanfu"  @click="首页类型切换()"  :src="!honmeT ? hei.lefimgzx : hei.leftimggc" alt>
               </div>

                 <div class="换肤">
                    <img   @click="换肤()" :src="皮肤区分.rightimg" alt>
               </div>

            </div>

            <div class="滚动"  :style="{'background':皮肤区分.boxColor}">
                <div class="icon_box"><span class="iconfont icontongzhi"></span></div>
                <marquee direction="left">This text will scroll from bottom tomarquee direction="up">This text will scroll from bottom to top top</marquee>
            </div>
             

                <lottery  v-if="honmeT"></lottery>
               <infor  v-if="!honmeT"></infor>
       </div>


   
    </div>
</template>
<script>
import headerT from '@/components/头部/头部.vue'//页尾组件
import lottery from '@/components/首页资讯版/首页资讯版.vue'//页尾组件
import infor from '@/components/首页购彩版/首页购彩版.vue'//页尾组件
 import {mapMutations,mapState} from 'vuex'
export default {
    data() {
        return {
          huanfu:true,//黑白切换
          honmeT:true,//购彩资讯切换
            banner: [
                require('../../assets/img/home/banner1.jpg'),
                require('../../assets/img/home/banner2.jpg'),
                require('../../assets/img/home/banner3.jpg'),
                require('../../assets/img/home/banner4.jpg'),
                require('../../assets/img/home/banner5.jpg'),
            ],
           bai:{
               color:"black",
               backg: "#f0f0f0",
               boxColor:"#ffffff",
               lefimgzx:require("../../assets/img/home/bai/1.24baa94.gif"),
               leftimggc:require("../../assets/img/home/bai/0.0d0714c.gif"),
               rightimg:require("../../assets/img/home/bai/switchSkin.791db4c.png"),
           },
            hei:{
               color:"#ffffff",
               backg: "black",
                boxColor:"#2c2e36",
                lefimgzx:require("../../assets/img/home/hei/0.1d39859.gif"),
                leftimggc:require("../../assets/img/home/hei/1.3f64ba7.gif"),
               rightimg:require("../../assets/img/home/hei/switchSkin.0eaf072.png"),
           }
          
        }
    },
    components: { // 注册组件
      headerT,
      lottery,
      infor,
    },
    computed: {
         皮肤区分(){
            if(this.huanfu==true){
                return this.bai
            }else{
                return this.hei
            }
        },
    },
    created() {
      
    },
    methods: {
      ...mapMutations({
            更改皮肤切换: "更改皮肤切换"
        }),
        首页类型切换(){
          this.honmeT=!this.honmeT
        },
         换肤(){
          this.huanfu=!this.huanfu          
           this.更改皮肤切换(this.huanfu)
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
.主页{
  position: fixed;
  left:0px;
  top:0px;
  width: 100%;
  height: 100%;
        overflow:auto;

    .content{
        // height: _vw(800); 
        height: 100%;
        overflow:auto;
       .轮播 {
        width: 100%;
        position: relative;
        .购彩资讯{
            left:0px;  
              width: _vw(64);
            height: _vw(50); 
            top:_vw(16);                   
        }
        .换肤{
            right: 0px;
              width: _vw(65);
            height: _vw(27);
            top:_vw(26);
        }
        .换肤,.购彩资讯{
            position: absolute;
            img{
                width: 100%;
                height:100%;
            }
        }
        .lb_box_img {
            width: 100%;
            height: _vw(150);
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .滚动{
        width: 92%;
        margin:_vw(6) auto;
        height: _vw(30);
        line-height: _vw(30);
        // background: gold;
        border-radius: _vw(20);
        display:flex;
        padding-left: _vw(10);
        .icontongzhi{
            font-size: _vw(22);
            color:goldenrod;
        }
        marquee{
            color:#999999;
            font-size: _vw(14);
        border:1px solid block;
        }
    }



    }
}
</style>