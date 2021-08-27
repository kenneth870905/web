<template>
    <div class="register">
        <!-- 免费开户 -->
        <iframe @load="load()" :src="config.iframe_url+'/Home/Register'" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            config: config,
            loading_1: ''
        }
    },
    methods: {
        load() {
            setTimeout(() => {
                this.loading_1.close()
            }, 500)
        }
    },
    mounted() {
        this.loading_1 = this.$loading({
            fullscreen: true,
            text: '拼命加载中···',
            // spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        // document.domain="https://0698aa.com"
    }

}
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 600px;
}
</style>
