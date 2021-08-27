<template>
    <div id="app">
        <router-view />
        
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                defaultActive:""
            };
        },
        mounted() {
            this.$axios.post('/huobi/public/index.php/user/getuserinfo').then(x=>{
                // 不需要出来已经在main.js 中出来
            }).catch(err=>{
            })
        },
    }
</script>

<style lang="scss">
    .el-message {
        top: calc(40% - 24px) !important;
    }

    ul,li{
        margin: 0px;
        padding: 0px;
        list-style: none;
    }
</style>