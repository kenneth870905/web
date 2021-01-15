<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        // this.$Spin.show()
        // this.$Spin.hide()
    },
}
</script>

<style lang="scss">

body{
    margin: 0px;
}
html,body{
    height: 100%;
}
#app{
    height: 100%;
}
ul{
    margin: 0px;
}
li{
    list-style: none;
}

.Breadcrumb{
    border-bottom: 1px solid #eee;
    padding: 0px 0px 5px;
}

.ivu-spin-fix{
    background-color: rgba(255,255,255,.4) !important;
}
</style>
