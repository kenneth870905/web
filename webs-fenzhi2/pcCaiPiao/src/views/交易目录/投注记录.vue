<template>
    <div class="home">
        <h1>投注纪录</h1>
        <iframe :src="config.api_url+'/Members/Info/MyOrder?bet=1'" frameborder="0"></iframe>
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
    components: {

    },

}
</script>
  <style lang="scss" scoped>
iframe {
    width: 100%;
    height: 600px;
}
</style>
  