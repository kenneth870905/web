<template>
  <div class="home">
     <!-- 充值 -->
        <iframe @load="load()" :src="config.api_url+'/Members/Money/Recharge?bet=1'" frameborder="0"></iframe>
        <!-- <iframe @load="load()" :src="config.iframe_url+'/Home/Register'" frameborder="0"></iframe> -->



<!-- <h1>注册页面</h1> -->
  </div>
</template>

<script>
export default {
    data(){
        return{
             config: config,
            loading_1:""
        }
    }, 
    components: { // 注册组件
        // load(){
        //     setTimeout(()=>{
        //         this.loading_1.close();
        //     },500)
        // }
    },
    // mounted(){
    //       this.loading_1 =this.$loading({ 
    //         fullscreen: true,
    //         text: '拼命加载中···',
    //         background: 'rgba(0, 0, 0, 0.7)'
    //     });
    // }

}
</script>
  <style lang="scss" scoped>
    iframe {
    width: 100%;
    height: 600px;
}
  </style>
  