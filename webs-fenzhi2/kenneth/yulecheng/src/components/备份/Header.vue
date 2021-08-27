<template>
 <div class="nav">
    <top v-if="!登陆信息1"></top>
    <logintop v-if="登陆信息1"></logintop>
    <div class="nav_box">
      <div class="container nav_div">
        <div class="logo">
            <img :src="ImgAddress+navImg.ligoImg" alt>
        </div>

        <div class="nav_div-routet">
           <ul>
                <li><div class="icon_box"><span class="el-icon-s-home"></span></div><div :class="{activecls:selectLab =='/'}" @click="clickTitle('/')">首页</div></li>
                <li> <div :class="{activecls:selectLab =='/immortal'}" @click="clickTitle('/immortal')">真人娱乐<i class="el-icon-caret-bottom"></i></div>
                     <div class="son_nav">
                       <ul>
                         <li><img :src="ImgAddress+navImg.flagship" alt=""></li>
                         <li><img :src="ImgAddress+navImg.international" alt=""></li>
                         <li><img :src="ImgAddress+navImg.recreation" alt=""></li>
                         <!-- <li><img src="@/assets/image/qj.png" alt=""></li>
                         <li><img src="@/assets/image/qj.png" alt=""></li>
                         <li><img src="@/assets/image/qj.png" alt=""></li> -->
                       </ul>
                     </div>
                </li>
                <li><div :class="{activecls:selectLab =='/electron'}" @click="clickTitle('/electron')">电子游艺<i class="el-icon-caret-bottom"></i></div>
                  <div class="son_nav">
                    <ul>
                      <li class="min_li" ><img :src="ImgAddress+navImg.AG" alt=""></li>
                      <li  class="min_li"><img :src="ImgAddress+navImg.BY" alt=""></li>
                      <li  class="min_li"><img :src="ImgAddress+navImg.YOPLAY" alt=""></li>
                        <li  class="min_li"><img :src="ImgAddress+navImg.KY" alt=""></li>
                    </ul>
                  </div>

                </li>
                <li><div :class="{activecls:selectLab =='/fish'}" @click="clickTitle('/fish')">铺鱼<i class="el-icon-caret-bottom"></i></div>
                     <div class="son_nav">
                       <ul>
                         <li class="min_li"><img :src="ImgAddress+navImg.PYag" alt=""></li>
                         <li class="min_li"><img :src="ImgAddress+navImg.KGdjht" alt=""></li>
                         <li class="min_li"><img :src="ImgAddress+navImg.KGdjhm" alt=""></li>
                          <li class="min_li"><img :src="ImgAddress+navImg.KGdjwh" alt=""></li>
                          <li class="min_li"><img :src="ImgAddress+navImg.KGdjby" alt=""></li>
                          <li class="min_li"><img :src="ImgAddress+navImg.KGdjbyds" alt=""></li>

                       </ul>
                     </div>
                </li>
                <li><div :class="{activecls:selectLab =='/street'}" @click="clickTitle('/street')">街机电游</div></li>
                <li><div :class="{activecls:selectLab =='/sports'}" @click="clickTitle('/sports')">体育</div>
                    <div class="son_nav">
                       <ul class="son_end">
                         <li><img :src="ImgAddress+navImg.TYBY" alt=""></li>
                         <li><img :src="ImgAddress+navImg.TYAG" alt=""></li>

                       </ul>
                     </div>
                </li>

                <li><div :class="{activecls:selectLab =='/lottery'}" @click="clickTitle('/lottery')"> 彩票<i class="el-icon-caret-bottom"></i> <div class="icon_re_box"><i class="iconfont icon-remen3"></i></div></div>
                          <div class="son_nav">
                         <ul>
                         <li  class="min_li"><img :src="ImgAddress+navImg.Acq" alt=""></li>
                         <li  class="min_li"><img :src="ImgAddress+navImg.Bcq" alt=""></li>
                         <li  class="min_li"><img :src="ImgAddress+navImg.Ccq" alt=""></li>
                          <li  class="min_li"><img :src="ImgAddress+navImg.Dcq" alt=""></li>
                          <li  class="min_li"><img :src="ImgAddress+navImg.Ecq" alt=""></li>
                          <li  class="min_li"><img :src="ImgAddress+navImg.Fcq" alt=""></li>
                          <li  class="min_li"><img :src="ImgAddress+navImg.Gcq" alt=""></li>
                          <li  class="min_li"><img :src="ImgAddress+navImg.Hcq" alt=""></li>
                       </ul>
                        </div>
                </li >
                <li><div :class="{activecls:selectLab =='/chess'}" @click="clickTitle('/chess')">棋牌</div></li>
                <li><div :class="{activecls:selectLab =='/discounts'}" @click="clickTitle('/discounts')">优惠</div></li>
                <li><div :class="{activecls:selectLab =='/phone'}" @click="clickTitle('/phone')"><i class="el-icon-mobile-phone"></i>
                 <div class="icon_re_box"><i class="iconfont icon-remen3"></i></div></div></li>

          </ul>
        </div>
    </div>
    </div>

 </div>
</template>

<script>
import top from '@/components/top/top.vue'
import logintop from '@/components/logintop/logintop.vue'
//  mapGetters , , mapActions
import { mapGetters } from 'vuex'
export default {
  components: { // 注册组件
    top,
    logintop
  },

  methods: {
    clickTitle (title) {
      this.selectLab = title // 把他点击的对象保存起来判断如果对应上了就为真就添加激活样式
      this.$router.history.push(title) // 点击跳转的对应地址
    }

  },
  data () {
    return {
      selectLab: '/', // 默认路径
      navImg: {
        ligoImg: 'logo.png',
        // 真人
        flagship: 'qj.png',
        international: 'gj.png',
        recreation: 'yul.png',
        //  电子游艺
        AG: 'xl-egame-ag.png',
        BY: 'xl-egame-bbin.png',
        YOPLAY: 'nav-yoplay.png',
        KY: 'nav-kg.png',
        // 捕鱼
        PYag: 'xl-buyu-ag02.png',
        KGdjht: 'nav-djby.png',
        KGdjhm: 'nav-fkby.png',
        KGdjwh: 'nav-wknh.png',
        KGdjby: 'xl-buyu-bbin01.png',
        KGdjbyds: 'xl-buyu-bbin02.png',
        //  彩票图片
        Acq: '1.png',
        Bcq: '2.png',
        Ccq: '3.png',
        Dcq: '4.png',
        Ecq: '5.png',
        Fcq: '6.png',
        Gcq: '7.png',
        Hcq: '8.png',
        Icq: '9.png',
        // 体育
        TYAG: 'xl-sports-pinbet.png',
        TYBY: 'xl-sports-bbin.png'

      }

    }
  },
  computed: {
    ...mapGetters({
      登陆信息1: '登陆信息1'
    })
  }
  // mounted(){
  //     this.更新登陆信息1()
  // }
}

</script>

<style lang="scss" scoped>

.activecls{
  color:red;
  border-bottom:3px solid red;
}

.nav_box{
  background: #0c0c18;
  height:72px;
  position: relative;
.nav_div {
  display: flex;
  justify-content:space-between;
  height:72px;

    //左边logo图片
   .logo {
    width: 198px;
    height: 58px;
    margin-top:12px;
    margin-right:90px;
    img{
      width:100%;
      height:100%;
    }
  }

  .nav_div-routet{
      height:72px;
      width:100%;

   ul{
    display:flex;
    justify-content:space-around;
    color:#fff;
    line-height: 72px;
    font-size: 15px;
    font-weight: 800px;
    width:100%;
     height:72px;
   li{
     height:100%;
     display:flex;
    //  position: relative;
     box-sizing: border-box;
     .icon_box{
       position: relative;
          .el-icon-s-home{
          position:absolute;
          top:24px;
          right:3px;
          color:red;
          font-size: 18px;
        }
     }
    //  热门图标
     .icon_re_box,{
        position: relative;
       .icon-remen3{
       color:rgb(240, 53, 53);
       font-size: 40px;
       position: absolute;
       top:-96px;
       right:-29px;

     }

     }
    .el-icon-mobile-phone{
      font-size:20px;
    }

     .el-icon-caret-bottom{
       margin:28px 0px 0px 6px;

     }

    //  子导航部分
    .son_nav{
        width: 100%;
      margin:0 auto;
      height:150px;
      position: absolute;
      left: 0px;
      top:72px !important;
      background:#0c0c18 ;
       border:none !important;
      z-index:11 !important;
      display:none;
      // ul儿子靠右 覆盖类
      .son_end{
          display:flex;
          justify-content:flex-end;
      }
      ul{
        display:flex;
        justify-content: flex-start;
        margin: 0px auto;
         width:1200px;
           height:150px;
           .min_li{ //li类覆盖
             width:160px;
          }
        li{
           width:220px;
            height:128px;
              border:none !important;
            border-radius: 8px;
            margin-right:10px;
          img{
            width:100%;
            height:100%;
            border:none !important;
            border-radius: 8px;
              transition: all 0.2s;
          }
        }
        .min_li{
             width:160px;
        }
      }
    }
     .son_nav ul li img:hover{
      background-color: hsl(240, 52%, 20%) !important;
      border:2px solid   hsl(240, 57%, 23%) !important;
       box-shadow: 5px 5px 5px 1px  hsl(240, 63%, 47%)  !important;
     }
   }
   li:hover{
     color:red;
      border-bottom:2px solid red;
   }
    li:hover .son_nav{
      display:block;
    }
  }
  }
}
}

</style>
