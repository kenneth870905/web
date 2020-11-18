<template>
     <!-- 蒙层 -->
      <div class="Obscuration" v-show="showObscuration">
        <div class="textObscuration">
          <div class="close" @click="showObscuration=false">关闭图标</div>
          <div>
            重要内容具体内容
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <el-button type="danger" @click="showObscuration=false">关闭图标</el-button>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        data() {
    return {
      showObscuration:false,
    };
  },
   methods: {
    // // 点击注册按钮跳转到注册页面
    // registered() {
    //   this.$router.history.push("/registered");
    // }
  }
    }
</script>

<style lang="scss" scoped>
*,html{
  padding:0px;
  margin:0px;
}
 // 蒙层样式
.Obscuration {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // 提示框样式
  .textObscuration {
    width: 600px;
    height: 450px;
    background: #fff;
    position: relative;
    // 关闭
    .close {
      position: absolute;
      top: -30px;
      right: 0px;
      background: red;
      width: 76px;
      height: 30px;
      color: #fff;
    }
  }
}
// 蒙层样式结束
</style>