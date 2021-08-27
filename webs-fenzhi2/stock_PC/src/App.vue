<template>
  <div id="app">
    <!-- 路由出口 -->
    <Head></Head>
    <router-view/>
    <Footer></Footer>

    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
 import Head from '@/components/head/Head.vue';
  import Footer from '@/components/footer/Footer.vue';
export default {
    components: {  // 注册组件
        Head,
        Footer,
    }
};
</script>

<style lang="less">
body{
  background: #f7f7f7;
}
html,body,ul,li{
  padding:0px;
  margin:0px;
}
li{
  list-style:none;
}
a{
  text-decoration:none;
}
.container {
  //版心
  width: 1200px;
  margin: 0 auto;
}
.green {
    color: green;
}
.red {
    color: red;
}
.font_c{
    color:#fff;
    
}
</style>
