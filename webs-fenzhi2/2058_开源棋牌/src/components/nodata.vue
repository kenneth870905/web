<template>
    <div class="暂无数据">
        <i class="van-icon van-icon-description"></i>
        <div class="str">{{str ? str : '暂无数据~'}}</div>
    </div>
</template>

<script>
export default {
    name:"",
    props:{
        str:''
    },
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.暂无数据{
    text-align: center;
    padding: _vw(30) 0px;
}
i{
    font-size: _vw(60);
    color: #616161;
}
.str{
    font-size: _vw(12);
    color: #444444;
}
</style>