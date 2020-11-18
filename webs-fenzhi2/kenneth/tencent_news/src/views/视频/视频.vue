<template>
    <div>
        <header1 />
        <div class="0">
            <sp />
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
const header1 = () => import('@/components/header.vue')
import sp from './components/视频.vue'
export default {
    name: "",
    components: {
        sp,
        header1
    },
    data() {
        return {
        }
    },
    beforeCreate: function () { },
    created: function () { },
    beforeMount: function () { },
    mounted: function () {
        // var swiper = new Swiper(this.$refs.swiper_1);
        console.log('页面挂载完成')
        // this.$nextTick(()=>{
        //     console.log('页面挂载完成1')
        // })
    },
    beforeUpdate: function () { },
    updated: function () { },
    beforeDestroy: function () { },
    destroyed: function () { }
}
</script>

<style lang="scss" scoped>
.Main {
    background: #ffffff;
    min-height: 50%;
    border-top-left-radius: _vw(15);
    border-top-right-radius: _vw(15);
}
</style>
