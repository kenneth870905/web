<template>
   <div>
      <van-nav-bar title="银行卡设置" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
    data(){
        return{}
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
    background: #c1c1c1;
}
.van-nav-bar__title {
    color: white;
    font-size: 18px;
    font-weight: bold;
}
.van-nav-bar .van-icon {
    color: white;
}
</style>