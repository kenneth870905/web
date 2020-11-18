<template>
  <div>
      <van-nav-bar title="信息公告" left-arrow @click-left="onClickLeft" />
      <img src="image/my/notice_1.png" alt="">
      <div id="central" >
           <div id="central_1" @click="$router.push('/xtgonggao')" >
              <i class="van-icon van-icon-volume" style="margin-left:7px;color:red;"></i>
             <span>系统公告</span>
             <i style="float:right;top:10px;right:10px;font-size:20px;" class="van-icon van-icon-arrow"></i>
           </div>
           <div id="central_1" @click="$router.push('/xxtongzhi')">
              <i class="van-icon van-icon-bell" style="margin-left:7px;color:red;"></i>
             <span>消息通知</span>
             <i  style="float:right;top:10px;right:10px;font-size:20px;" class="van-icon van-icon-arrow"></i>
           </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
     methods:{
         onClickLeft() {
            this.$router.go(-1);
        },
    }
}
</script>

<style>
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
#central{
    width: 90%;
    height: 150px;
    background: linear-gradient(#e0e0e0, #fefefe);
    margin: 20px;
    position: relative;
    top: -50px;
    border-radius: 10px;
}
#central_1{
    width: 85%;
    height: 40px;
    background: #ffffff;
    margin: 25px;
    top: 15px;
    position: relative;
    border-radius: 7px;
}
#central_1 span{
    font-size: 14px;
    line-height: 40px;
    color: black;
    margin-left: 5px;
}
</style>