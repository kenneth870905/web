<template>
    <div class="home">
        <!-- 充值 -->
        <iframe @load="load()" :src="config.iframe_url+'/Members/Money/Withdraw?bet=1'" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            config: config,
            loading_1: ""
        }
    },
    components: { // 注册组件
    
    },
}
</script>
  <style lang="scss" scoped>
iframe {
    width: 100%;
    height: 600px;
}
</style>
  