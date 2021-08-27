<template>
       <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="chat" @click="tz()">优惠活动</van-tabbar-item>
            <van-tabbar-item icon="records" >充值提现</van-tabbar-item>
            <van-tabbar-item icon="gold-coin">我</van-tabbar-item>
        </van-tabbar>
</template>

<script>
export default {
   data(){
       return{
           active: 0,
       }
   }
}
</script>

<style>

</style>
