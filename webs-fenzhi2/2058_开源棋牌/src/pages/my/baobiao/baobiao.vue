<template>
  <div>
      <van-nav-bar title="个人报表" left-arrow @click-left="onClickLeft" />
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
</style>