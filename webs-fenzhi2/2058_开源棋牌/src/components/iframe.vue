<template>
    <div v-if="src" class="mui-fullscreen">
        <iframe :src="src" frameborder="0" ></iframe>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            src:"",
            urlList:{
                qd:'/M/System/SignIn',
                ShouChong: '/Html/ShouChong/'
            }
        }
    },
    methods: {
        设置地址(){
        }
    },
    mounted() {
        // /M/System/SignIn
        console.log(this.$route)
        var type=this.$route.params.type
        this.src=config.iframe_url+this.urlList[type];

    },
}
</script>

<style scoped>
iframe{
    width: 100%;
    height: 100%;
}
</style>
