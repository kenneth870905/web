<template>
    <div  class="Download" :style="{ 'background': 'url(' + require('../../assets/imgs/'+bgDef) + ') no-repeat center center', 'background-size': '100% 100%'}">
         <!-- 控制路由的title -->
         <div v-wechat-title="$route.meta.title=titleAll.title"></div>
         <div class="container">
             <el-row class="down">
                <el-col :span="10" class="phone">
                    <img src="../../assets/imgs/zhanshi.png" alt="">
                </el-col>
                <el-col :span="14" class="down_img">
                    <div>
                        <img class="down_text_img" src="../../assets/imgs/xiazai-biaoti (1).png" alt=""><br>
                       <p>用户一键下单 随时随地掌上操盘</p> 
                         <ul class="">
                             <li ><img src="../../assets/imgs/pingguo.png" alt=""></li>
                             <li ><img src="../../assets/imgs/pingguo.png" alt=""></li>
                             <li ><img src="../../assets/imgs/pingguo.png" alt=""></li>                    
                         </ul>
                    </div>
                </el-col>
                </el-row>
         </div>
    </div>
</template>

<script>
    export default {
        data(){
             return{
                 num :0,
                  titleAll:{//控制页面的title
          title:"软件下载"
      },
       bgDef:"down-bg.jpg",//背景图片
             }
        }
    }
</script>

<style lang="scss" scoped>
.Download {
  height: 600px;
  width: 100%;
 .container {
  //版心

    .down{
         height:600px;
         .phone{
                 height:600px;
         }
         .down_img{
                 height:600px;
                 text-align: center;
          ul{
              display: flex;
              justify-content: space-around;
              li{
                  width:180px;
                  height:180px;
                  list-style:none;
                  img{
                      width:100%;
                      height:100%;
                  }
              }
          }
          .down_text_img{
              margin:106px auto auto 40px;
          }
          p{
              margin:30px auto 40px 40px;
              color:#fff;
              font-size: 30px;
          }
         }
    }
 }
 
}
</style>