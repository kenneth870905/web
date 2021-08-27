<template>
    <div class="portion">
        <van-nav-bar title="漫画" left-arrow :fixed="true" @click-left="onClickLeft" />

        <div class="portion_content">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
         
        }
    },
    computed: {
       
    },
    created() {
     
    },

    methods: {
        onClickLeft() {//头部
            history.back()
        },
    }
}
</script>

<style lang="scss" scoped>

.portion {
    background: #202136;
    .portion_content {

    }
}
</style>
