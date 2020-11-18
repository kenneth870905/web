<template>
      <van-tabbar route>
            <van-tabbar-item to="/" icon="van-icon van-icon-wap-home">  首页</van-tabbar-item>
            <van-tabbar-item to="/youhui" icon="van-icon van-icon-gift-o">优惠活动</van-tabbar-item>
            <van-tabbar-item to="/chongzhi" icon="van-icon van-icon-balance-o">充值</van-tabbar-item>
            <van-tabbar-item to="/tixian" icon="van-icon van-icon-balance-pay">提现</van-tabbar-item>
            <van-tabbar-item to="/my" icon="van-icon van-icon-user-circle-o">我</van-tabbar-item>
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

<style>

</style>
