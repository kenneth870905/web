<template>
    <div class="暂无数据">
        <div class="img">
            <img src="static/image/kongshuju.png" alt="" srcset="">
        </div>
        <div>{{name}}</div>
    </div>
</template>

<script>
export default {
    name:"",
    props:{
        name:{
            default:"暂无数据"
        }
    },
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.暂无数据{
    margin: 50px 0px 0px;
    text-align: center;
    font-size: 20px;
    color: #777777;
}
.img{
    img{
        opacity: 0.5;
        max-width: 100%;
        width: 120px;
    }
}
</style>