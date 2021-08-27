<template>
    <div>
        <div class="iframe_box" :style="'height:'+height+'px'">
            <iframe ref="iframe" @load="load_1()" v-if="iframe[type]" :src="config.iframe_url + iframe[type]" frameborder="0"></iframe>
            <!-- <iframe ref="iframe" @load="load_1()" v-if="iframe[type]" :src="config.api_url + iframe[type]" frameborder="0"></iframe> -->
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            height: 600,
            config: config,
            iframe: {
                // 会员中心
                'person': '/Members/Info/Person?bet=1',
                'deposit': '/Members/Money/Recharge?bet=1',
                'withdrawal': '/Members/Money/Withdraw?bet=1',
                'orders': '/Members/Info/MyOrder?bet=1'
            },
            type: '',
            loading_1: ''
        }
    },
    methods: {
        init() {
            this.loading_1 = this.$loading({
                fullscreen: true,
                text: 'Loading',
                // spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            this.type = this.$route.params.type
            this.$nextTick(() => {
                setTimeout(() => {
                    this.loading_1.close()
                }, 500)
            })
        },
        load_1() {
            // var iframe = document.getElementById(id);
            var iframe = this.$refs.iframe
            try {
                var height = iframe.contentWindow.document.documentElement.scrollHeight
                this.height = height
            } catch (error) { }
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        $route() {
            this.height = 600
            this.init()
        }
    }
}
</script>

<style lang="scss" scoped>
.iframe_box {
    height: 600px;
}
iframe {
    height: 100%;
    width: 100%;
}
</style>
