<template>
    <div id="app">
        <button @click="全屏切换()">全屏切换</button>
        <input type="text" v-model="file_url">
        <button @click="删除文件()">删除测试</button>
        <router-view />
    </div>
</template>

<script>
const {remote} = window.require('electron')
export default {
    name:"",
    data () {
        return {
            file_url:""
        }
    },
    methods: {
        全屏切换(){
            var wind = remote.getCurrentWindow()
            wind.simpleFullScreen = !wind.simpleFullScreen;
        },
        删除文件(){
            var fs = window.require('fs');
            fs.unlinkSync(this.file_url);
        }
    },
}
</script>

<style lang="scss">

</style>
