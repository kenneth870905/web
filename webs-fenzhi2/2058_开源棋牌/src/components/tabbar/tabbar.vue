<template>
      <van-tabbar route >
            <van-tabbar-item to="/" ><i class="fa fa-yelp" style="margin-left:4px;"></i> <p style="font-weight: 500;color:#444;">首页</p></van-tabbar-item>
            <van-tabbar-item to="/cpdt" > <i class="fa fa-tachometer" style="margin-left:16px;"></i> <p  style="font-weight: 500;color:#444;">游戏大厅</p> </van-tabbar-item>
            <van-tabbar-item to="/chongzhi" > <i class="fa fa-credit-card" style="margin-left:16px;"></i><p  style="font-weight: 500;color:#444;">资金管理</p></van-tabbar-item>
            <van-tabbar-item to="/tixian" > <i class="fa fa-random" style="margin-left:16px;"></i> <p  style="font-weight: 500;color:#444;">在线提款</p></van-tabbar-item>
            <van-tabbar-item to="/my" > <i class="fa fa-user-circle" style="margin-left:2px;"></i> <p  style="font-weight: 500;color:#444;">我的</p></van-tabbar-item>
            <!-- <van-tabbar-item icon="van-icon van-icon-wap-home"  @click="shouye()">首页</van-tabbar-item>
            <van-tabbar-item icon="van-icon van-icon-gift-o" @click="youhui()">优惠活动</van-tabbar-item>
            <van-tabbar-item icon="van-icon van-icon-balance-o" @click="chongzhi()">充值</van-tabbar-item>
            <van-tabbar-item icon="van-icon van-icon-balance-pay" @click="tixian()" >提现</van-tabbar-item>
            <van-tabbar-item icon="van-icon van-icon-user-circle-o"   @click="my()">我</van-tabbar-item> -->
        </van-tabbar>
</template>

<script>
export default {
   data(){
       return{
           active: 0,
       }
   },
   methods:{
       shouye(){
           this.$router.push('/')
       },
       youhui(){
          this.$router.push('/youhui')
       },
       chongzhi(){
          this.$router.push('/chongzhi')
       },
       tixian(){
        this.$router.push('/tixian')
       },
       my(){
           this.$router.push('/my')
       },
   },
//    watch:{
//        $route(){
//            var path=this.$route.path;
//            console.log(path) 
//            if(path=='/'){
//                this.active=0
//            }else if(path=='/my'){
//                this.active=4
//            }
//        }
//    }
}
</script>

<style scoped>
.fa{
    font-size: 24px;
    color: #444;
}
</style>
