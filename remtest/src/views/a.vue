<template>
    <div class="box-1">
        <router-link  to="/" tag="button">首页</router-link>

        <div v-for="item in 50">内部自带滚动条{{item}}</div>
    </div>
</template>


<style scoped>
.box-1{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    overflow: auto;
     -webkit-overflow-scrolling: touch
}
</style>

