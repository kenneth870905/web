<template>
    <div>
        <router-view :is="xq"></router-view>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            xq:""
        }
    },
    mounted() {
        let t = this.$route.query.t
        if(t==7){
            this.xq = () =>import('./牛牛详情.vue')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
