<template>
<div>
      <div class="footer">
      <div class="container">
        <el-row>
          <el-col :span="8" class="date">
            <strong>服务热线</strong>
            <h1>{{this.phone}}</h1>
            <span>工作时间：08:00 - 20:00</span><br>
            <span>周一至周五(法定节假日除外)</span><br>
            <span>周末时间：09:00 - 18:00</span>
          </el-col>
          <el-col :span="8" class="wx_ewm">
            <div class="wx_img">
              <img :src="wximg"><br>
              <span>微信客服</span>
            </div>
            <div class="wx_img">
              <img :src="qqimg"><br>
              <span>QQ客服</span>
            </div>
          </el-col>
          <el-col :span="8" class=footer_nav>
            <el-row>
              <el-col :span="8"><strong>关于我们</strong></el-col>
              <el-col :span="8"><strong>配资引导</strong></el-col>
              <el-col :span="8"><strong>帮助中心</strong></el-col>
            </el-row>

            <el-row>
              <el-col :span="8"> <router-link to="/about">公司简介</router-link></el-col>
              <el-col :span="8"> <router-link to="/about">资金安全</router-link></el-col>
              <el-col :span="8"> <router-link to="/about">如何注册？</router-link></el-col>
            </el-row>

            <el-row>
              <el-col :span="8"> <router-link to="/about">办公环境</router-link></el-col>
              <el-col :span="8"> <router-link to="/about">超盘细则</router-link></el-col>
              <el-col :span="8"> <router-link to="/about">如何充值？</router-link></el-col>
            </el-row>

            <el-row>
              <el-col :span="8"> <router-link to="/about">联系我们</router-link></el-col>
              <el-col :span="8"> <router-link to="/about">软件下载</router-link></el-col>
              <el-col :span="8"> <router-link to="/about">如何配资？</router-link></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 页尾-bottom -->
    <div  class="footer_bottom">
      <div  class="container footer_logo">
        <div class="footer_logo_box"><img src="../../assets/imgs/stat.png" alt=""></div>
        <div class="footer_logo_box"><img src="../../assets/imgs/stat.png" alt=""></div>
        <div class="footer_logo_box"><img src="../../assets/imgs/stat.png" alt=""></div>
        <div class="footer_logo_box"><img src="../../assets/imgs/stat.png" alt=""></div>
        <div class="footer_logo_box"><img src="../../assets/imgs/stat.png" alt=""></div>
      </div>
      <div class="footer_bottom_text">Copyright © 2008-2020 
         <router-link to="/">【新宝配资】</router-link>深圳海商汇创新投资有限公司 
         <router-link to="gggg">粤ICP备18158468号-1 </router-link>股市有风险,投资需谨慎 </div>
    </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            phone:"400-6558-138",
            wximg:require("../../assets/imgs/wx01.jpg"),
            qqimg:require("../../assets/imgs/wx05.png")
          }
        }
    }
</script>

<style lang="scss" scoped>
// *,html{
//   padding:0px;
//   margin:0px;
// }
// .container {
//   //版心
//   width: 1200px;
//   margin: 0 auto;
// }
// a {
//   text-decoration: none;
// }

// 页尾foor
.footer {
  background: #414141;
  height: 220px;
  color:#fff;
  padding-top:30px;
 box-sizing: border-box;
   position:flex;
  left:0px;
  bottom:80px;
  width:100%;

  .wx_ewm {
    display: flex;
    justify-content: space-around;
    .wx_img {
      width: 120px;
      height: 120px;
      margin-top:20px;
      img {
        width: 120px;
        height: 120px;
      }
      span{
        padding-left:12px;
      }
    }
  }
  .date{
    margin-top:20px;
    h1{
      margin:5px auto 10px auto;
    }
    span{
      color:black;
    }
  }
  .footer_nav{
    padding-left:140px;
    line-height: 40px;
    a{
      color:#fff;
      font-size: 14px;
    }
     a:hover{
       color:red;
     }
  }
}
//页尾---buttom
.footer_bottom{
  position:flex;
  left:0px;
  bottom:0px;
  width:100%;
  height:80px;
  background:#555555;
  text-align: center;
  padding-top:20px;
  .footer_logo{
    display: flex;
    justify-content:center;
    margin-bottom: 10px;
    .footer_logo_box{
      width:100px;
      height:40px;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .footer_bottom_text{
    color:#ccc;
    a{
      color:#fff;
    }
  }
}
</style>