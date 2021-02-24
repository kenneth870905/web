<template>
    <div class="nodata">
        <img src="static/img/empty-image-default.png" alt="" srcset="">
        <div>暂无数据</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.nodata{
    text-align: center;
    color: rgba($color: #000000, $alpha: 0.6);
}
</style>