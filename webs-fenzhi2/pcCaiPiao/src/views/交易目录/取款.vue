<template>
    <div class="home">
        <h1>取款</h1>
        <iframe @load="load()" :src="config.api_url+'/Members/Money/Withdraw?bet=1'" frameborder="0"></iframe>
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
  