<template>
    <div>
        <!-- 横幅 -->
        <banner />

        <box1 />

        <tiyu />

        <youxi />

        <fuwu />
    </div>
</template>

<script>
const banner = () => import('./components/banner.vue')
const box1 = () => import('./components/box1.vue');
const tiyu = () => import('./components/tiyu.vue');
const youxi = () => import('./components/youxi.vue');
const fuwu = () => import('./components/fuwu.vue');
export default {
    name: "",
    components: { banner , box1 , tiyu , youxi , fuwu },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {


    },
}
</script>

<style lang="scss" scoped>
</style>